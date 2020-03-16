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
  loadingSite: boolean
  loadingCashiers: boolean
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
  loadingSite: false,
  loadingCashiers: false,
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
    getSiteRequest(state) {
      state.loadingSite = true
    },
    getSiteSuccess(state, action: PayloadAction<Site>) {
      state.site = action.payload
      state.loadingSite = false
      state.error = ''
    },
    getSiteFail(state, action: PayloadAction<string>) {
      state.loadingSite = false
      state.error = action.payload
    },
    getCashiersRequest(state) {
      state.loadingCashiers = true
    },
    getCashiersSuccess(
      state,
      action: PayloadAction<{ cashiers?: Cashier[]; pagination: Pagination }>
    ) {
      state.cashiers = action.payload.cashiers
      state.pagination = action.payload.pagination
      state.loadingCashiers = false
      state.error = ''
    },
    getCashiersFail(state, action: PayloadAction<string>) {
      state.loadingCashiers = false
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
  getSiteRequest,
  getSiteSuccess,
  getSiteFail,
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
  getCashiersRequest,
  getCashiersSuccess,
  getCashiersFail,
  getCashierRequest,
  getCashierSuccess,
  getCashierFail
} = siteEditorSlice.actions

export const { resetSiteEditor, clearCashierEditor } = siteEditorSlice.actions

export const siteEditorReducer = siteEditorSlice.reducer

export const getCashiers = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  const { pagination: oldPagination, site } = getState().siteEditor
  if (!site?.id) return

  dispatch(getCashiersRequest())
  try {
    const { result, ...pagination } = await api.cashiers.getCashiers({
      pageSize: oldPagination.pageSize,
      page: oldPagination.page,
      ...params,
      siteId: site.id
    })

    dispatch(
      getCashiersSuccess({
        cashiers: result as Cashier[],
        pagination: {
          ...pagination,
          pageSize: params.pageSize ?? oldPagination.pageSize
        }
      })
    )
  } catch (err) {
    dispatch(getCashiersFail(err.toString()))
    return err.toString()
  }
}

export const getSite = (id: number): AppThunk => async dispatch => {
  dispatch(getSiteRequest())
  try {
    const site = await api.sites.getSite({ id })

    dispatch(getSiteSuccess(site as Site))
    dispatch(getCashiers())
  } catch (err) {
    dispatch(getSiteFail(err.toString()))
    return err.toString()
  }
}

export const saveSite = (site: Site, id?: number): AppThunk => async dispatch => {
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
      dispatch(updateSiteSuccess())
      dispatch(getCashiers())
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
    siteEditorState.site?.id && dispatch(getCashiers())
    return true
  } catch (err) {
    dispatch(saveCashierFail(err.toString()))
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
      dispatch(getCashiers({ page: newPage }))
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
