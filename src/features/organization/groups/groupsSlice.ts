import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { Group } from 'models/group'
import { FeatureState } from 'models/featureState'
import moment from 'moment'
import { downloadBlobAsCsv } from 'services/file-reader'
import { api } from 'api'

interface State {
  groups: Group[]
  listParams: ListRequestParams
  listState: FeatureState
}

const initialState: State = {
  groups: [],
  listParams: {
    pageSize: 10
  },
  listState: FeatureState.Initial
}

const slice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    reset: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    setListState(state, action: PayloadAction<FeatureState>) {
      state.listState = action.payload
    },
    getGroupsSuccess(
      state,
      action: PayloadAction<{ groups: Group[]; listParams: ListRequestParams }>
    ) {
      state.groups = action.payload.groups
      state.listParams = action.payload.listParams
      state.listState = FeatureState.Success
    }
  }
})

const { reset, resetListParams, setListState, getGroupsSuccess } = slice.actions

const getGroups = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const revisedParams = reviseListRequestParams(getState().groups.listParams, params)
    const { result, ...pagination } = await api.admin.groups.getOrganizationGroups(revisedParams)
    dispatch(
      getGroupsSuccess({
        groups:
          result?.map(
            x =>
              ({
                ...x,
                createdDate: moment(x.createdDate)
              } as Group)
          ) || [],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const resetGroupsFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getGroups())
}

const exportGroups = (): AppThunk => async (dispatch, getState) => {
  const { listParams } = getState().groups

  try {
    const file = await api.admin.groups.exportOrganizationGroups(listParams)
    downloadBlobAsCsv(file)
  } catch (err) {
    return { error: err.toString() }
  }
}

export const groupsReducer = slice.reducer

export const groupsActions = {
  getGroups,
  resetGroupsFilters,
  reset,
  exportGroups
}
