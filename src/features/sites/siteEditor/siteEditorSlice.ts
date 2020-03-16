import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { Site } from 'models/site'
import { message } from 'antd'
import i18n from 'app/i18n'
import { Cashier } from 'models/cashier'
import { history } from 'router/router'
import {
  ListRequestParams,
  Pagination,
  recalculatePaginationAfterDeletion
} from 'hooks/useTableUtils'

interface SiteEditorState {
  site?: Site
  cashiers?: Cashier[]
  pagination: Pagination
  cashier?: Cashier
  loadingData: boolean
  loadingSave: boolean
  loadingDelete: boolean
  loadingCashierSave: boolean
  loadingCashierGet: boolean
  error: string
}

const initialState: SiteEditorState = {
  cashiers: [],
  pagination: {
    pageSize: 10
  },
  loadingData: false,
  loadingSave: false,
  loadingDelete: false,
  loadingCashierSave: false,
  loadingCashierGet: false,
  error: ''
}

const siteEditorSlice = createSlice({
  name: 'siteEditor',
  initialState,
  reducers: {
    resetSiteEditor: () => initialState,
    getSiteEditorDataRequest(state) {
      state.loadingData = true
    },
    getSiteEditorDataSuccess(
      state,
      action: PayloadAction<{ site: Site; cashiers?: Cashier[]; pagination: Pagination }>
    ) {
      state.site = action.payload.site
      state.cashiers = action.payload.cashiers
      state.pagination = action.payload.pagination
      state.loadingData = false
      state.error = ''
    },
    getSiteEditorDataFail(state, action: PayloadAction<string>) {
      state.loadingData = false
      state.error = action.payload
    },
    updateCashiersRequest(state) {
      state.loadingData = true
    },
    updateCashiersSuccess(
      state,
      action: PayloadAction<{ cashiers?: Cashier[]; pagination: Pagination }>
    ) {
      state.cashiers = action.payload.cashiers
      state.pagination = action.payload.pagination
      state.loadingData = false
      state.error = ''
    },
    updateCashiersFail(state, action: PayloadAction<string>) {
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
    deleteCashierRequest(state) {
      state.loadingDelete = true
    },
    deleteCashierSuccess(state) {
      message.success(i18n.t('common.message.delete-success'), 5)
      state.loadingDelete = false
      state.error = ''
    },
    deleteCashierFail(state, action: PayloadAction<string>) {
      state.loadingDelete = false
      state.error = action.payload
    },
    saveCashierRequest(state) {
      state.loadingCashierSave = true
    },
    saveCashierSuccess(state) {
      message.success(i18n.t('common.message.save-success'), 5)
      state.loadingCashierSave = false
      state.error = ''
    },
    saveCashierFail(state, action: PayloadAction<string>) {
      state.loadingCashierSave = false
      state.error = action.payload
    },
    getCashierRequest(state) {
      state.loadingCashierGet = true
    },
    getCashierSuccess(state, action: PayloadAction<Cashier>) {
      state.cashier = action.payload
      state.loadingCashierGet = false
      state.error = ''
    },
    getCashierFail(state, action: PayloadAction<string>) {
      state.loadingCashierGet = false
      state.error = action.payload
    },
    clearCashierEditor(state) {
      state.cashier = undefined
      state.error = ''
      state.loadingCashierSave = false
      state.loadingCashierGet = false
    }
  }
})

const {
  getSiteEditorDataRequest,
  getSiteEditorDataSuccess,
  getSiteEditorDataFail,
  saveSiteRequest,
  createSiteSuccess,
  updateSiteSuccess,
  saveSiteFail,
  saveCashierRequest,
  saveCashierSuccess,
  saveCashierFail,
  deleteCashierRequest,
  deleteCashierSuccess,
  deleteCashierFail,
  updateCashiersRequest,
  updateCashiersSuccess,
  updateCashiersFail,
  getCashierRequest,
  getCashierSuccess,
  getCashierFail
} = siteEditorSlice.actions

export const { resetSiteEditor, clearCashierEditor } = siteEditorSlice.actions

export const siteEditorReducer = siteEditorSlice.reducer

export const getSiteEditorData = (id: number, params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(getSiteEditorDataRequest())
  try {
    const site = await api.sites.getSite({ id })
    const oldPagination = getState().siteEditor.pagination
    const { result, ...pagination } = await api.cashiers.getCashiers({
      pageSize: oldPagination.pageSize,
      page: oldPagination.page,
      ...params,
      siteId: site.id
    })

    dispatch(
      getSiteEditorDataSuccess({
        site,
        cashiers: result ?? undefined,
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

export const updateCashiers = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  const { pagination: oldPagination, site } = getState().siteEditor
  if (!site?.id) return

  dispatch(updateCashiersRequest())
  try {
    const { result, ...pagination } = await api.cashiers.getCashiers({
      pageSize: oldPagination.pageSize,
      page: oldPagination.page,
      ...params,
      siteId: site.id
    })

    dispatch(
      updateCashiersSuccess({
        result,
        pagination: {
          ...pagination,
          pageSize: params.pageSize ?? oldPagination.pageSize
        }
      })
    )
  } catch (err) {
    dispatch(updateCashiersFail(err.toString()))
    return err.toString()
  }
}

export const saveSite = (site: Site, id?: number): AppThunk => async (dispatch, getState) => {
  dispatch(saveSiteRequest())
  try {
    // TODO: integrate, remove partner get because it will be on the JWT.
    const partner = await api.partner.getSelfPartner()

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

export const saveCashier = (cashier: Cashier): AppThunk => async (dispatch, getState) => {
  dispatch(saveCashierRequest())

  try {
    if (cashier.id) {
      await api.cashiers.updateCashier({ id: cashier.id, cashierDto: cashier })
    } else {
      await api.cashiers.createCashier({
        createCashierDto: { ...cashier, siteId: getState().siteEditor.site?.id }
      })
    }

    dispatch(saveCashierSuccess())

    const siteEditorState = getState().siteEditor
    siteEditorState.site?.id &&
      dispatch(getSiteEditorData(siteEditorState.site?.id, siteEditorState.pagination))
    return true
  } catch (err) {
    dispatch(saveCashierFail(err.toString()))
    return false
  }
}

export const deleteCashier = (id: number): AppThunk => async (dispatch, getState) => {
  dispatch(deleteCashierRequest())

  try {
    await api.cashiers.deleteCashier({ id })
    dispatch(deleteCashierSuccess())

    const siteEditorState = getState().siteEditor
    if (siteEditorState.site?.id) {
      const newPage = recalculatePaginationAfterDeletion(getState().siteList.pagination)
      dispatch(getSiteEditorData(siteEditorState.site?.id, { page: newPage }))
    }
    return { id }
  } catch (err) {
    dispatch(deleteCashierFail(err.toString()))
    return { id, error: err.toString() }
  }
}

export const getCashier = (id: number): AppThunk => async dispatch => {
  dispatch(getCashierRequest())
  try {
    const cashier = await api.cashiers.getCashier({ id })
    dispatch(getCashierSuccess(cashier))
  } catch (err) {
    dispatch(getCashierFail(err.toString()))
  }
}
