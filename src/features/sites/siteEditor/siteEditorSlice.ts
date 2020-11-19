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
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'

interface State {
  site?: Site
  cashiers?: Cashier[]
  cashiersListParams: ListRequestParams
  cashier?: Cashier
  siteEditorState: FeatureState
  cashierListState: FeatureState
  cashierEditorState: FeatureState
  cashierDeleteState: FeatureState
}

const initialState: State = {
  cashiers: [],
  cashiersListParams: {
    pageSize: 10
  },
  siteEditorState: FeatureState.Initial,
  cashierListState: FeatureState.Initial,
  cashierEditorState: FeatureState.Initial,
  cashierDeleteState: FeatureState.Initial
}

const slice = createSlice({
  name: 'siteEditor',
  initialState,
  reducers: {
    reset: () => initialState,
    setSiteEditorState(state, action: PayloadAction<FeatureState>) {
      state.siteEditorState = action.payload
    },
    setCashierEditorState(state, action: PayloadAction<FeatureState>) {
      state.cashierEditorState = action.payload
    },
    setCashierListState(state, action: PayloadAction<FeatureState>) {
      state.cashierListState = action.payload
    },
    setCashierDeleteState(state, action: PayloadAction<FeatureState>) {
      state.cashierDeleteState = action.payload
    },
    getSiteSuccess(state, action: PayloadAction<Site>) {
      state.siteEditorState = FeatureState.Initial
      state.site = action.payload
    },
    getCashiersSuccess(
      state,
      action: PayloadAction<{ cashiers?: Cashier[]; listParams: ListRequestParams }>
    ) {
      state.cashiers = action.payload.cashiers
      state.cashiersListParams = action.payload.listParams
      state.cashierListState = FeatureState.Success
    },
    createSiteSuccess(state) {
      message.success(i18n.t('common.message.save-success'), 5)
      state.siteEditorState = FeatureState.Success
    },
    updateSiteSuccess(state) {
      state.siteEditorState = FeatureState.Success
      message.success(i18n.t('common.message.save-success'), 5)
    },
    deleteCashierSuccess(state) {
      state.cashierDeleteState = FeatureState.Success
      message.success(i18n.t('common.message.delete-success'), 5)
    },
    saveCashierSuccess(state) {
      state.cashierEditorState = FeatureState.Success
      message.success(i18n.t('common.message.save-success'), 5)
    },
    getCashierSuccess(state, action: PayloadAction<Cashier>) {
      state.cashierEditorState = FeatureState.Success
      state.cashier = action.payload
    },
    clearCashierEditor(state) {
      state.cashierEditorState = FeatureState.Initial
      state.cashier = undefined
    }
  }
})

const {
  setCashierEditorState,
  setCashierListState,
  setSiteEditorState,
  setCashierDeleteState
} = slice.actions
const {
  getSiteSuccess,
  createSiteSuccess,
  updateSiteSuccess,
  saveCashierSuccess,
  deleteCashierSuccess,
  getCashiersSuccess,
  getCashierSuccess
} = slice.actions
const { reset, clearCashierEditor } = slice.actions

const getCashiers = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  const { site } = getState().siteEditor
  if (!site?.id) return

  try {
    dispatch(setCashierListState(FeatureState.Loading))
    const revisedParams = reviseListRequestParams(getState().siteEditor.cashiersListParams, params)
    const { result, ...pagination } = await api.coupon.cashiers.getCashiers({
      ...revisedParams,
      siteId: site.id
    })
    dispatch(
      getCashiersSuccess({
        cashiers: result as Cashier[],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setCashierListState(FeatureState.Error))
  }
}

const getSite = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(setSiteEditorState(FeatureState.Loading))
    const site = await api.coupon.sites.getSite({ id })
    dispatch(getSiteSuccess(site as Site))
    dispatch(getCashiers())
  } catch (err) {
    dispatch(setSiteEditorState(FeatureState.Error))
  }
}

const saveSite = (
  site: Site,
  id?: number,
  partnerId?: number,
  editorRoute?: string
): AppThunk => async dispatch => {
  try {
    dispatch(setSiteEditorState(FeatureState.Loading))
    // TODO: integrate, remove partner get because it will be on the JWT.

    let sitePartnerId = partnerId
    if (!sitePartnerId) {
      const partner = await api.coupon.partner.getMyPartner({})
      sitePartnerId = partner.id
    }

    if (id) {
      await api.coupon.sites.updateSite({
        id,
        siteDto: {
          ...site,
          partnerId: sitePartnerId
        }
      })
      dispatch(updateSiteSuccess())
      dispatch(getCashiers())
    } else {
      const newId = await api.coupon.sites.createSite({
        siteDto: {
          ...site,
          partnerId: sitePartnerId
        }
      })
      dispatch(createSiteSuccess())
      newId.id && editorRoute && history.push(`${editorRoute}/${newId.id}`)
    }
  } catch (err) {
    dispatch(setSiteEditorState(FeatureState.Error))
  }
}

const saveCashier = (cashier: Cashier): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setCashierEditorState(FeatureState.Loading))

    if (cashier.id && !isNaN(cashier.id)) {
      await api.coupon.cashiers.updateCashier({ id: cashier.id, cashierDto: cashier })
    } else {
      await api.coupon.cashiers.createCashier({
        cashierDto: { ...cashier, siteId: getState().siteEditor.site?.id }
      })
    }

    dispatch(saveCashierSuccess())
    dispatch(getCashiers())
    return true
  } catch (err) {
    dispatch(setCashierEditorState(FeatureState.Error))
    return false
  }
}

const deleteCashier = (id: number): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setCashierDeleteState(FeatureState.Loading))

    await api.coupon.cashiers.deleteCashier({ id })
    dispatch(deleteCashierSuccess())

    const siteEditorState = getState().siteEditor
    if (siteEditorState.site?.id) {
      const newPage = recalculatePaginationAfterDeletion(getState().siteEditor.cashiersListParams)
      dispatch(getCashiers({ page: newPage }))
    }
    return { id }
  } catch (err) {
    dispatch(setCashierDeleteState(FeatureState.Error))
    return { id, error: err.toString() }
  }
}

const getCashier = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(setCashierEditorState(FeatureState.Loading))
    const cashier = await api.coupon.cashiers.getCashier({ id })
    dispatch(getCashierSuccess(cashier))
  } catch (err) {
    dispatch(setCashierEditorState(FeatureState.Error))
  }
}

export const siteEditorReducer = slice.reducer

export const siteEditorActions = {
  reset,
  clearCashierEditor,
  getCashiers,
  getSite,
  saveSite,
  saveCashier,
  deleteCashier,
  getCashier
}
