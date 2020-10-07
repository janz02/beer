import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'
import { SystemParam } from 'models/systemParam'
import i18n from 'app/i18n'

interface SystemParamsState {
  systemParamsList: SystemParam[]
  listParams: ListRequestParams
  listState: FeatureState
}

const initialState: SystemParamsState = {
  systemParamsList: [],
  listParams: {
    pageSize: 10
  },
  listState: FeatureState.Initial
}

const systemParamsSlice = createSlice({
  name: 'systemParams',
  initialState,
  reducers: {
    resetSystemParamsList: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    setListState: (state, action: PayloadAction<FeatureState>) => {
      state.listState = action.payload
    },
    getSystemParamsSuccess(
      state,
      action: PayloadAction<{ systemParams: SystemParam[]; listParams: ListRequestParams }>
    ) {
      state.systemParamsList = action.payload.systemParams
      state.listParams = action.payload.listParams
      state.listState = FeatureState.Success
    }
  }
})

const {
  resetListParams,
  setListState,
  getSystemParamsSuccess,
  resetSystemParamsList
} = systemParamsSlice.actions

const getSystemParams = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const revisedParams = reviseListRequestParams(getState().systemParams.listParams, params)

    // todo integration
    const items = [
      {
        id: 1,
        name: 'KKV kampány limit',
        key: 'kkvLimit',
        value: '20',
        description: i18n.t(`system-params.key.${'kkvLimit'}`)
      },
      {
        id: 2,
        name: 'Ügyfélszolgálat telefonszám',
        key: 'customerSuppportPhone',
        value: '06 20 123 4567',
        description: i18n.t(`system-params.key.${'customerSuppportPhone'}`)
      },
      {
        id: 3,
        name: 'Ügyfélszolgálat e-mail cím',
        key: 'customerSupportEmail',
        value: 'ugyfelszolgalat@nkmplusz.hu',
        description: i18n.t(`system-params.key.${'customerSupportEmail'}`)
      },
      {
        id: 4,
        name: 'KPR nyertes kuponok gyűjtője link',
        key: 'winnerCouponLink',
        value: '/WinnerCoupon',
        description: i18n.t(`system-params.key.${'winnerCouponLink'}`)
      }
    ]
    const pagination = { totalCount: 4, from: 0, to: 10, page: 1, size: 10 }

    dispatch(
      getSystemParamsSuccess({
        systemParams: items,
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const resetSystemParamsFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getSystemParams())
}

export const systemParamsActions = {
  resetSystemParamsList,
  getSystemParams,
  resetSystemParamsFilters
}

export const systemParamsReducer = systemParamsSlice.reducer
