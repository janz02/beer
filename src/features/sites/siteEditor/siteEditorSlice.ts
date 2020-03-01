import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { Site } from 'models/site'
import { message } from 'antd'
import i18n from 'app/i18n'
import { SiteApiKey } from 'models/siteApiKey'
import moment from 'moment'
import { history } from 'router/router'
import {
  ListRequestParams,
  Pagination,
  recalculatePaginationAfterDeletion
} from 'hooks/useTableUtils'

interface SiteEditorState {
  site?: Site
  siteApiKeys?: SiteApiKey[]
  generatedApiKey?: string
  addNewApiKeyPopupVisible: boolean
  copyApiKeyPopupVisible: boolean
  pagination: Pagination
  loadingData: boolean
  loadingSave: boolean
  loadingDelete: boolean
  loadingApiKeyCreate: boolean
  error: string
}

const initialState: SiteEditorState = {
  siteApiKeys: [],
  addNewApiKeyPopupVisible: false,
  copyApiKeyPopupVisible: false,
  pagination: {
    pageSize: 10
  },
  loadingData: false,
  loadingSave: false,
  loadingDelete: false,
  loadingApiKeyCreate: false,
  error: ''
}

const siteEditorSlice = createSlice({
  name: 'siteEditor',
  initialState,
  reducers: {
    setAddNewApiKeyPopupVisible(state, action: PayloadAction<boolean>) {
      state.addNewApiKeyPopupVisible = action.payload
    },
    closeApiKeyPopup(state) {
      state.copyApiKeyPopupVisible = false
      state.generatedApiKey = ''
    },
    resetSiteEditor: () => initialState,
    getSiteEditorDataRequest(state) {
      state.loadingData = true
    },
    getSiteEditorDataSuccess(
      state,
      action: PayloadAction<{ site: Site; siteApiKeys?: SiteApiKey[]; pagination: Pagination }>
    ) {
      state.site = action.payload.site
      state.siteApiKeys = action.payload.siteApiKeys
      state.pagination = action.payload.pagination
      state.loadingData = false
      state.error = ''
    },
    getSiteEditorDataFail(state, action: PayloadAction<string>) {
      state.loadingData = false
      state.error = action.payload
    },
    saveSiteRequest(state) {
      state.loadingSave = true
    },
    createSiteSuccess(state) {
      message.success(i18n.t('common.message.save-success'), 5)
      state.loadingSave = false
      state.error = ''
    },
    updateSiteSuccess(state) {
      message.success(i18n.t('common.message.save-success'), 5)
      state.loadingSave = false
      state.error = ''
    },
    saveSiteFail(state, action: PayloadAction<string>) {
      state.loadingSave = false
      state.error = action.payload
    },
    deleteApiKeyRequest(state) {
      state.loadingDelete = true
    },
    deleteApiKeySuccess(state) {
      message.success(i18n.t('common.message.delete-success'), 5)
      state.loadingDelete = false
      state.error = ''
    },
    deleteApiKeyFail(state, action: PayloadAction<string>) {
      state.loadingDelete = false
      state.error = action.payload
    },
    createApiKeyRequest(state) {
      state.loadingApiKeyCreate = true
    },
    createApiKeySuccess(state, action: PayloadAction<string>) {
      state.generatedApiKey = action.payload
      state.loadingApiKeyCreate = false
      state.addNewApiKeyPopupVisible = false
      state.copyApiKeyPopupVisible = true
      state.error = ''
    },
    createApiKeyFail(state, action: PayloadAction<string>) {
      state.loadingApiKeyCreate = false
      state.error = action.payload
    }
  }
})

const {
  getSiteEditorDataRequest,
  getSiteEditorDataSuccess,
  getSiteEditorDataFail
} = siteEditorSlice.actions
const {
  saveSiteRequest,
  createSiteSuccess,
  updateSiteSuccess,
  saveSiteFail
} = siteEditorSlice.actions
const { createApiKeyRequest, createApiKeySuccess, createApiKeyFail } = siteEditorSlice.actions
const { deleteApiKeyRequest, deleteApiKeySuccess, deleteApiKeyFail } = siteEditorSlice.actions

export const {
  resetSiteEditor,
  setAddNewApiKeyPopupVisible,
  closeApiKeyPopup
} = siteEditorSlice.actions

export default siteEditorSlice.reducer

export const getSiteEditorData = (id: number, params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(getSiteEditorDataRequest())
  try {
    const site = await api.sites.getSite({ id })
    const oldPagination = getState().siteEditor.pagination
    const { result, ...pagination } = await api.apiKey.getApiKeys({
      pageSize: oldPagination.pageSize,
      page: oldPagination.page,
      ...params,
      siteId: site.id
    })

    const siteApiKeys = result?.map(
      key =>
        ({
          ...key,
          expireDate: moment(key.expireDate)
        } as SiteApiKey)
    )

    dispatch(
      getSiteEditorDataSuccess({
        site,
        siteApiKeys,
        pagination: {
          ...pagination,
          pageSize: params.pageSize ?? oldPagination.pageSize
        }
      })
    )
  } catch (err) {
    dispatch(getSiteEditorDataFail(err.toString()))
    return err.toString()
  }
}

export const saveSite = (site: Site, id?: number): AppThunk => async (dispatch, getState) => {
  dispatch(saveSiteRequest())
  try {
    // TODO: integrate, remove partner get because it will be on the JWT.
    const partner = await api.partner.getMyPartner()

    if (id) {
      await api.sites.updateSite({
        id,
        siteDto: {
          ...site,
          partnerId: partner.id
        }
      })
      dispatch(getSiteEditorData(id, getState().siteEditor.pagination))
      dispatch(updateSiteSuccess())
    } else {
      const newId = await api.sites.createSite({
        siteDto: {
          ...site,
          partnerId: partner.id
        }
      })
      dispatch(createSiteSuccess())
      newId.id && history.push(`/sites/editor/${newId.id}`)
    }
  } catch (err) {
    dispatch(saveSiteFail(err.toString()))
  }
}

export const createApiKey = (name: string): AppThunk => async (dispatch, getState) => {
  dispatch(createApiKeyRequest())

  try {
    const response = await api.apiKey.createApiKey({
      createSiteApiKeyDto: { name, siteId: getState().siteEditor.site?.id }
    })
    dispatch(createApiKeySuccess(response.id2 ?? ''))

    const siteEditorState = getState().siteEditor
    siteEditorState.site?.id &&
      dispatch(getSiteEditorData(siteEditorState.site?.id, siteEditorState.pagination))
  } catch (err) {
    dispatch(createApiKeyFail(err.toString()))
  }
}

export const deleteApiKey = (id: number): AppThunk => async (dispatch, getState) => {
  dispatch(deleteApiKeyRequest())

  try {
    await api.apiKey.deleteApiKey({ id })
    dispatch(deleteApiKeySuccess())

    const siteEditorState = getState().siteEditor
    if (siteEditorState.site?.id) {
      const newPage = recalculatePaginationAfterDeletion(getState().siteList.pagination)
      dispatch(getSiteEditorData(siteEditorState.site?.id, { page: newPage }))
    }
  } catch (err) {
    dispatch(deleteApiKeyFail(err.toString()))
  }
}
