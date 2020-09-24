import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { Partner } from 'models/partner'
import { downloadBlobAsCsv } from 'services/file-reader'

interface PartnerListState {
  partners: Partner[]
  error: boolean
  loading: boolean
  listParams: ListRequestParams
}

const initialState: PartnerListState = {
  error: false,
  loading: false,
  partners: [],
  listParams: {
    pageSize: 10
  }
}

const partnersListSlice = createSlice({
  name: 'partnersList',
  initialState,
  reducers: {
    resetPartnersList: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    getPartnersRequest(state) {
      state.loading = true
    },
    getPartnersSuccess(
      state,
      action: PayloadAction<{ partners: Partner[]; listParams: ListRequestParams }>
    ) {
      state.partners = action.payload.partners
      state.listParams = action.payload.listParams
      state.loading = false
      state.error = false
    },
    getPartnersFail(state) {
      state.loading = false
      state.error = true
    }
  }
})

const {
  resetListParams,
  getPartnersRequest,
  getPartnersSuccess,
  getPartnersFail
} = partnersListSlice.actions
export const { resetPartnersList } = partnersListSlice.actions

export const partnersListReducer = partnersListSlice.reducer

export const getPartners = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getPartnersRequest())

    const revisedParams = reviseListRequestParams(getState().partnerList.listParams, params)

    const { result, ...pagination } = await api.coupon.partner.getPartners(revisedParams)

    dispatch(
      getPartnersSuccess({
        partners: result as any,
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(getPartnersFail())
  }
}

export const exportPartners = (): AppThunk => async (dispatch, getState) => {
  const { listParams } = getState().partnerList

  try {
    const file = await api.coupon.partner.exportPartners(listParams)
    downloadBlobAsCsv(file)
  } catch (err) {
    return { error: err.toString() }
  }
}

export const resetPartnerFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getPartners())
}
