import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { Site } from 'models/site'
import { message } from 'antd'
import i18n from 'app/i18n'
import { SiteApiKey } from 'models/siteApiKey'
import moment from 'moment'
import { Pagination, calculatePagination } from 'models/pagination'
import { GetApiKeysRequest } from 'api/swagger'

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
  name: '@site-editor',
  initialState,
  reducers: {
    setAddNewApiKeyPopupVisible(state, action: PayloadAction<boolean>) {
      state.addNewApiKeyPopupVisible = action.payload
    },
    closeApiKeyPopup(state) {
      state.copyApiKeyPopupVisible = false
      state.generatedApiKey = ''
    },
    resetSiteEditor(state) {
      state.site = undefined
      state.loadingData = false
      state.loadingSave = false
      state.error = ''
    },
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
    saveSiteSuccess(state) {
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
const { saveSiteRequest, saveSiteSuccess, saveSiteFail } = siteEditorSlice.actions
const { createApiKeyRequest, createApiKeySuccess, createApiKeyFail } = siteEditorSlice.actions
const { deleteApiKeyRequest, deleteApiKeySuccess, deleteApiKeyFail } = siteEditorSlice.actions

export const {
  resetSiteEditor,
  setAddNewApiKeyPopupVisible,
  closeApiKeyPopup
} = siteEditorSlice.actions

export default siteEditorSlice.reducer

export const getSiteEditorData = (id: number, params: GetApiKeysRequest = {}): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(getSiteEditorDataRequest())
  try {
    const site = await api.sites.getSite({ id })

    const oldPagination = getState().siteList.pagination
    const pagination = calculatePagination(params, oldPagination)

    const apiKeysResponse = await api.apiKey.getApiKeys({
      pageSize: pagination.pageSize,
      page: pagination.page,
      siteId: site.id
    })

    const siteApiKeys = apiKeysResponse.result?.map(
      x =>
        ({
          ...x,
          expireDate: moment(x.expireDate)
        } as SiteApiKey)
    )

    dispatch(
      getSiteEditorDataSuccess({
        site,
        siteApiKeys,
        pagination: {
          ...apiKeysResponse
        }
      })
    )
  } catch (err) {
    dispatch(getSiteEditorDataFail(err.toString()))
    return err.toString()
  }
}

export const saveSite = (site: Site, id: number): AppThunk => async (dispatch, getState) => {
  dispatch(saveSiteRequest())
  try {
    // TODO: integrate, remove partner get because it will be on the JWT.
    const partner = await api.partner.getMyPartner()

    if (id > 0) {
      await api.sites.updateSite({
        id,
        siteDto: {
          ...site,
          partnerId: partner.id
        }
      })
      dispatch(getSiteEditorData(id, getState().siteEditor.pagination))
    } else {
      const newId = await api.sites.createSite({
        siteDto: {
          ...site,
          partnerId: partner.id
        }
      })
      newId.id && dispatch(getSiteEditorData(newId.id, getState().siteEditor.pagination))
    }
    dispatch(saveSiteSuccess())
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
    siteEditorState.site?.id &&
      dispatch(getSiteEditorData(siteEditorState.site?.id, siteEditorState.pagination))
  } catch (err) {
    dispatch(deleteApiKeyFail(err.toString()))
  }
}
