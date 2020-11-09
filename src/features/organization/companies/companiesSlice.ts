import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from 'api'
import { AppThunk } from 'app/store'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { Company } from 'models/company'
import { FeatureState } from 'models/featureState'
import moment from 'moment'
import { downloadBlobAsCsv } from 'services/file-reader'

interface State {
  companies: Company[]
  savingStatusIds: { [id: number]: boolean }
  listParams: ListRequestParams
  listState: FeatureState
}

const initialState: State = {
  companies: [],
  savingStatusIds: {},
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
    setCompanyStatusRequest(state, action: PayloadAction<number>) {
      state.savingStatusIds[action.payload] = true
    },
    setCompanyStatusSuccess(state, action: PayloadAction<{ id: number; isActive: boolean }>) {
      const { id, isActive } = action.payload
      const company = state.companies.find(x => x.id === id)
      if (company) {
        company.isActive = isActive
      }

      delete state.savingStatusIds[action.payload.id]
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

const {
  reset,
  resetListParams,
  setListState,
  getCompaniesSuccess,
  setCompanyStatusRequest,
  setCompanyStatusSuccess
} = slice.actions

const getCompanies = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const revisedParams = reviseListRequestParams(getState().companies.listParams, params)
    const { result, ...pagination } = await api.admin.companies.getCompanies(revisedParams)
    dispatch(
      getCompaniesSuccess({
        companies:
          result?.map(x => ({ ...x, createdDate: moment(x.createdDate) } as Company)) || [],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const setCompanyStatus = (id: number, isActive: boolean): AppThunk => async dispatch => {
  try {
    dispatch(setCompanyStatusRequest(id))
    await api.admin.companies.setCompanyStatus({ id, companyStatusDto: { isActive } })
    dispatch(setCompanyStatusSuccess({ id, isActive }))
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const resetCompaniesFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getCompanies())
}

const exportCompanies = (): AppThunk => async (dispatch, getState) => {
  const { listParams } = getState().companies

  try {
    const file = await api.admin.companies.exportCompanies(listParams)
    downloadBlobAsCsv(file)
  } catch (err) {
    return { error: err.toString() }
  }
}

export const companiesReducer = slice.reducer

export const companiesActions = {
  getCompanies,
  setCompanyStatus,
  resetCompaniesFilters,
  reset,
  exportCompanies
}
