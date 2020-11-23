import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { Profile } from 'models/profile'
import { FeatureState } from 'models/featureState'
import { downloadBlobAsCsv } from 'services/file-reader'
import { api } from 'api'
import moment from 'moment'
import { ProfileStatus } from 'api/swagger/admin'

export type ProfileListTab = 'all' | 'waiting-for-approval' | 'declined'

interface State {
  selectedTab: ProfileListTab
  profiles: Profile[]
  listParams: ListRequestParams
  listState: FeatureState
}

const initialState: State = {
  selectedTab: 'all',
  profiles: [],
  listParams: {
    pageSize: 10
  },
  listState: FeatureState.Initial
}

const slice = createSlice({
  name: 'profileList',
  initialState,
  reducers: {
    reset: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    setListState(state, action: PayloadAction<FeatureState>) {
      state.listState = action.payload
    },
    setSelectedTab(state, action: PayloadAction<ProfileListTab>) {
      state.selectedTab = action.payload
    },
    getProfilesSuccess(
      state,
      action: PayloadAction<{ profiles: Profile[]; listParams: ListRequestParams }>
    ) {
      state.profiles = action.payload.profiles
      state.listParams = action.payload.listParams
      state.listState = FeatureState.Success
    }
  }
})

const { reset, resetListParams, setListState, getProfilesSuccess, setSelectedTab } = slice.actions

const getProfiles = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))

    const { listParams, selectedTab } = getState().profileList
    const revisedParams = reviseListRequestParams(listParams, params)

    const requestParams = { ...revisedParams }
    switch (selectedTab) {
      case 'all':
        if (requestParams.status) {
          requestParams.statuses = [requestParams.status]
        }

        break
      case 'declined':
        requestParams.statuses = [ProfileStatus.Declined]
        break
      case 'waiting-for-approval':
        requestParams.statuses = [ProfileStatus.WaitingForApproval]
        break
    }

    const { result, ...pagination } = await api.admin.profiles.getProfiles(requestParams)

    dispatch(
      getProfilesSuccess({
        profiles:
          result?.map(
            x => (({ ...x, createdDate: moment(x.createdDate) } as unknown) as Profile)
          ) || [],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const changeSelectedTab = (tab: ProfileListTab): AppThunk => async dispatch => {
  dispatch(setSelectedTab(tab))
  dispatch(getProfiles())
}

const resetProfilesFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getProfiles())
}

const exportProfiles = (): AppThunk => async (dispatch, getState) => {
  const { listParams } = getState().profileList

  try {
    downloadBlobAsCsv(await api.admin.profiles.exportProfiles(listParams))
  } catch (err) {
    return { error: err.toString() }
  }
}

const setProfileStatus = (id: number, status: ProfileStatus): AppThunk => async dispatch => {
  try {
    await api.admin.profiles.setProfileStatus({ id, profileStatusDto: { status } })
    dispatch(getProfiles())
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

export const profileListReducer = slice.reducer

export const profileListActions = {
  getProfiles,
  resetProfilesFilters,
  reset,
  exportProfiles,
  changeSelectedTab,
  setProfileStatus
}
