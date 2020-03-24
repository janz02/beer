import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { Partner } from 'models/partner'

interface PartnerContactsState {
  contacts: any[]
  error: boolean
  loading: boolean
  listParams: ListRequestParams
}

const initialState: PartnerContactsState = {
  contacts: [],
  error: false,
  loading: false,
  listParams: {
    pageSize: 10
  }
}

const partnersContactsSlice = createSlice({
  name: 'partnersContacts',
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

export const getPartners = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getPartnersRequest())
    const revisedParams = reviseListRequestParams(getState().newsletterList.listParams, params)
    const { result, ...pagination } = await api.partner.getPartners(revisedParams)
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
