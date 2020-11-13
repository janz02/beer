import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { ProfileListItem } from 'models/profileListItem'
import { FeatureState } from 'models/featureState'
import { getProfilesMock } from './profilesMock'

interface State {
  profiles: ProfileListItem[]
  listParams: ListRequestParams
  listState: FeatureState
}

const initialState: State = {
  profiles: [],
  listParams: {
    pageSize: 10
  },
  listState: FeatureState.Initial
}

const slice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    reset: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    setListState(state, action: PayloadAction<FeatureState>) {
      state.listState = action.payload
    },
    getProfilesSuccess(
      state,
      action: PayloadAction<{ profiles: ProfileListItem[]; listParams: ListRequestParams }>
    ) {
      state.profiles = action.payload.profiles
      state.listParams = action.payload.listParams
      state.listState = FeatureState.Success
    }
  }
})

const { reset, resetListParams, setListState, getProfilesSuccess } = slice.actions

const getProfiles = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const revisedParams = reviseListRequestParams(getState().profiles.listParams, params)
    const { result, ...pagination } = await getProfilesMock(revisedParams)
    dispatch(
      getProfilesSuccess({
        profiles: result as ProfileListItem[],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const resetProfilesFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getProfiles())
}

export const profilesReducer = slice.reducer

export const profilesActions = {
  getProfiles,
  resetProfilesFilters,
  reset
}
