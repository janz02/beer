import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { Company } from 'models/company'
import { FeatureState } from 'models/featureState'
import { getCompaniesMock } from './companiesMock'

interface State {
  companies: Company[]
  listParams: ListRequestParams
  listState: FeatureState
}

const initialState: State = {
  companies: [],
  listParams: {
    pageSize: 10
  },
  listState: FeatureState.Initial
}

const slice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    reset: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    setListState(state, action: PayloadAction<FeatureState>) {
      state.listState = action.payload
    },
    getCompaniesSuccess(
      state,
      action: PayloadAction<{ companies: Company[]; listParams: ListRequestParams }>
    ) {
      state.companies = action.payload.companies
      state.listParams = action.payload.listParams
      state.listState = FeatureState.Success
    }
  }
})

const { reset, resetListParams, setListState, getCompaniesSuccess } = slice.actions

const getCompanies = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const revisedParams = reviseListRequestParams(getState().companies.listParams, params)
    const { result, ...pagination } = await getCompaniesMock(revisedParams)
    dispatch(
      getCompaniesSuccess({
        companies: result as Company[],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const resetCompaniesFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getCompanies())
}

export const companiesReducer = slice.reducer

export const companiesActions = {
  getCompanies,
  resetCompaniesFilters,
  reset
}
