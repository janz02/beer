import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { JobRole } from 'models/jobRole'
import { FeatureState } from 'models/featureState'
import moment from 'moment'
import { api } from 'api'
import { downloadBlobAsCsv } from 'services/file-reader'

interface State {
  jobRoles: JobRole[]
  listParams: ListRequestParams
  listState: FeatureState
}

const initialState: State = {
  jobRoles: [],
  listParams: {
    pageSize: 10
  },
  listState: FeatureState.Initial
}

const slice = createSlice({
  name: 'jobRoleList',
  initialState,
  reducers: {
    reset: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    setListState(state, action: PayloadAction<FeatureState>) {
      state.listState = action.payload
    },
    getJobRolesSuccess(
      state,
      action: PayloadAction<{ jobRoles: JobRole[]; listParams: ListRequestParams }>
    ) {
      state.jobRoles = action.payload.jobRoles
      state.listParams = action.payload.listParams
      state.listState = FeatureState.Success
    }
  }
})

const { reset, resetListParams, setListState, getJobRolesSuccess } = slice.actions

const getJobRoles = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const revisedParams = reviseListRequestParams(getState().jobRoleList.listParams, params)
    const { result, ...pagination } = await api.admin.jobRoles.getJobRoles(revisedParams)

    dispatch(
      getJobRolesSuccess({
        jobRoles: result?.map(x => ({ ...x, createdDate: moment(x.createdDate) } as JobRole)) || [],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const resetJobRolesFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getJobRoles())
}

const exportJobRoles = (): AppThunk => async (dispatch, getState) => {
  const { listParams } = getState().jobRoleList

  try {
    const file = await api.admin.jobRoles.exportJobRoles(listParams)
    downloadBlobAsCsv(file)
  } catch (err) {
    return { error: err.toString() }
  }
}

export const jobRoleListReducer = slice.reducer

export const jobRolesActions = {
  reset,
  getJobRoles,
  exportJobRoles,
  resetJobRolesFilters
}
