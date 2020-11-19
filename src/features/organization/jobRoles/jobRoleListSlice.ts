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
    //  const { result, ...pagination } = await api.admin.jobRoles.getJobRoles(revisedParams)
    dispatch(
      getJobRolesSuccess({
        jobRoles: [
          {
            id: 1,
            name: 'Test',
            createdDate: moment('2018-12-31T22:43:40.000Z'),
            profileCount: 4,
            groupCount: 2,
            companyCount: 3,
            createdBy: 'Johanna'
          },
          {
            id: 2,
            name: 'Second',
            createdDate: moment('2019-12-31T22:43:40.000Z'),
            profileCount: 4,
            groupCount: 2,
            companyCount: 3,
            createdBy: 'Josef'
          }
        ],
        // jobRoles: result?.map(x => ({ ...x, createdDate: moment(x.createdDate) } as JobRole)) || [],
        listParams: {
          pageSize: 10,
          page: 1,
          from: 1,
          to: 2,
          size: 2
        } // pagination)
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
  /* const { listParams } = getState().jobRoleList

   try {
    const file = await api.admin.jobRoles.exportJobRoles(listParams)
    downloadBlobAsCsv(file)
  } catch (err) {
    return { error: err.toString() }
  } */
}

export const jobRoleListReducer = slice.reducer

export const jobRolesActions = {
  reset,
  getJobRoles,
  exportJobRoles,
  resetJobRolesFilters
}
