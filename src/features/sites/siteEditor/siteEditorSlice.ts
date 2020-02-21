import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { Site } from 'models/site'
import { message } from 'antd'
import i18n from 'app/i18n'
import { SiteApiKey } from 'models/siteApiKey'
import moment from 'moment'
import { Pagination, calculatePagination } from 'models/pagination'
import { ListApiKeyRequest } from 'api/swagger'

interface SiteEditorState {
  site?: Site
  siteApiKeys?: SiteApiKey[]
  generatedApiKey?: string
  addNewApiKeyPopupVisible: boolean
  copyApiKeyPopupVisible: boolean
  pagination: Pagination
  loadingData: boolean
  loadingSave: boolean
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
    getSiteRequest(state) {
      state.loadingData = true
    },
    getSiteSuccess(state, action: PayloadAction<{ site: Site }>) {
      state.site = action.payload.site
      state.loadingData = false
      state.error = ''
    },
    getSiteFail(state, action: PayloadAction<string>) {
      state.loadingData = false
      state.error = action.payload
    },
    listApiKeyRequest(state) {
      state.loadingData = true
    },
    listApiKeySuccess(
      state,
      action: PayloadAction<{ siteApiKeys?: SiteApiKey[]; pagination: Pagination }>
    ) {
      state.siteApiKeys = action.payload.siteApiKeys
      state.pagination = action.payload.pagination
      state.loadingData = false
      state.error = ''
    },
    listApiKeyFail(state, action: PayloadAction<string>) {
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

const { getSiteRequest, getSiteSuccess, getSiteFail } = siteEditorSlice.actions
const { saveSiteRequest, saveSiteSuccess, saveSiteFail } = siteEditorSlice.actions
const { listApiKeyRequest, listApiKeySuccess, listApiKeyFail } = siteEditorSlice.actions
const { createApiKeyRequest, createApiKeySuccess, createApiKeyFail } = siteEditorSlice.actions

export const {
  resetSiteEditor,
  setAddNewApiKeyPopupVisible,
  closeApiKeyPopup
} = siteEditorSlice.actions

export default siteEditorSlice.reducer

export const getSite = (id: number): AppThunk => async dispatch => {
  dispatch(getSiteRequest())
  try {
    const response = await api.sites.getSite({ id })
    dispatch(getSiteSuccess({ site: response }))
    return ''
  } catch (err) {
    dispatch(getSiteFail(err.toString()))
    return err.toString()
  }
}

export const saveSite = (site: Site, id: number): AppThunk => async dispatch => {
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
      dispatch(getSite(id))
    } else {
      const newId = await api.sites.createSite({
        siteDto: {
          ...site,
          partnerId: partner.id
        }
      })
      newId.id && dispatch(getSite(newId.id))
    }
    dispatch(saveSiteSuccess())
  } catch (err) {
    dispatch(saveSiteFail(err.toString()))
  }
}

export const listApiKey = (params: ListApiKeyRequest = {}): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(listApiKeyRequest())

  try {
    const oldPagination = getState().siteList.pagination
    const pagination = calculatePagination(params, oldPagination)

    const response = await api.apiKey.listApiKey({
      pageSize: pagination.pageSize,
      page: pagination.page
    })

    const siteApiKeys = response.result?.map(
      x =>
        ({
          ...x,
          expireDate: moment(x.expireDate)
        } as SiteApiKey)
    )

    dispatch(
      listApiKeySuccess({
        siteApiKeys,
        pagination: {
          ...response
        }
      })
    )
  } catch (err) {
    dispatch(listApiKeyFail(err.toString()))
  }
}

export const createApiKey = (name: string): AppThunk => async (dispatch, getState) => {
  dispatch(createApiKeyRequest())

  try {
    const response = await api.apiKey.createApiKey({
      createSiteApiKeyDto: { name, siteId: getState().siteEditor.site?.id }
    })
    dispatch(createApiKeySuccess(response.id2 ?? ''))
  } catch (err) {
    dispatch(createApiKeyFail(err.toString()))
  }
}
