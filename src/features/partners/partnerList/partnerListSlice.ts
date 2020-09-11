import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { couponApi } from 'api'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { Partner } from 'models/partner'

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

const { getPartnersRequest, getPartnersSuccess, getPartnersFail } = partnersListSlice.actions
export const { resetPartnersList } = partnersListSlice.actions

export const partnersListReducer = partnersListSlice.reducer

export const getPartners = (
  params: ListRequestParams = {},
  ignoreCurrentParams = false
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(getPartnersRequest())

    const revisedParams = ignoreCurrentParams
      ? params
      : reviseListRequestParams(getState().partnerList.listParams, params)

    const { result, ...pagination } = await couponApi.partner.getPartners(revisedParams)

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

export const resetPartnerFilters = (): AppThunk => getPartners(initialState.listParams, true)
