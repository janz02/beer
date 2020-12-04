import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from 'api'
import { AppThunk } from 'app/store'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { CampaignPermission } from 'models/campaign/campaignPermission'
import { Group } from 'models/group'
import { Profile } from 'models/profile'
import moment from 'moment'

interface GroupEditorState {
  group?: Group
  profiles: Profile[]
  profileTotalCount?: number
  permissions?: CampaignPermission[]
  permissionTotalCount?: number
  hasError: boolean
  isLoading: boolean
  isProfilesLoading: boolean
  isPermissionsLoading: boolean
  profileListParams: ListRequestParams
}

const initialState: GroupEditorState = {
  permissions: [],
  profiles: [],
  profileListParams: { pageSize: 10 },
  isLoading: false,
  isProfilesLoading: false,
  isPermissionsLoading: false,
  hasError: false
}

export const groupEditorSlice = createSlice({
  name: 'groupEditor',
  initialState,
  reducers: {
    resetGroupEditor: () => initialState,
    resetListParams(state) {
      state.profileListParams = initialState.profileListParams
    },
    setGroup: (state, action: PayloadAction<Group | undefined>): void => {
      state.group = action.payload
    },
    getGroupSuccess(state, action: PayloadAction<Group>) {
      state.group = action.payload
      state.isLoading = false
    },
    getProfilesSuccess: (
      state,
      action: PayloadAction<{ profiles: Profile[]; listParams: ListRequestParams }>
    ): void => {
      state.profiles = action.payload.profiles
      state.profileListParams = action.payload.listParams
      state.profileTotalCount = action.payload.listParams.size
      state.isProfilesLoading = false
    },
    getPermissionsSuccess: (state, action: PayloadAction<CampaignPermission[]>): void => {
      state.permissions = action.payload
      state.permissionTotalCount = action.payload.length
      state.isPermissionsLoading = false
    },
    setLoading: (state, action: PayloadAction<boolean>): void => {
      state.isLoading = action.payload
    },
    setPermissionsLoading: (state, action: PayloadAction<boolean>): void => {
      state.isPermissionsLoading = action.payload
    },
    setProfilesLoading: (state, action: PayloadAction<boolean>): void => {
      state.isProfilesLoading = action.payload
    },
    setError: (state): void => {
      state.hasError = true
    }
  }
})

export const {
  resetGroupEditor,
  resetListParams,
  getGroupSuccess,
  getProfilesSuccess,
  getPermissionsSuccess,
  setError,
  setLoading,
  setProfilesLoading,
  setPermissionsLoading
} = groupEditorSlice.actions

const getGroup = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(setLoading(true))
    const group = await api.admin.groups.getOrganizationGroup({ id })

    dispatch(
      getGroupSuccess({
        ...group,
        createdDate: group.createdDate && moment(group.createdDate)
      } as Group)
    )
  } catch (err) {
    console.error(err)
    dispatch(setError())
    dispatch(setLoading(false))
  }
}

const getGroupProfiles = (id: number, params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setProfilesLoading(true))
    const { profileListParams } = getState().groupEditor
    const revisedParams = reviseListRequestParams(profileListParams, params)

    const requestParams = { ...revisedParams }
    if (requestParams.status) {
      requestParams.statuses = [requestParams.status]
    }
    const { result, ...pagination } = await api.admin.profiles.getProfiles({
      ...requestParams,
      groupIds: [id]
    })

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
    console.error(err)
    dispatch(setError())
    dispatch(setProfilesLoading(false))
  }
}

const getGroupPermissions = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(setPermissionsLoading(true))

    const { items } = await api.campaignEditor.permissions.getPermissions({ pageSize: -1 })

    dispatch(getPermissionsSuccess(items?.map(x => x as CampaignPermission) || []))
  } catch (err) {
    console.error(err)
    dispatch(setError())
    dispatch(setPermissionsLoading(false))
  }
}

const resetProfilesFilters = (id: number): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getGroupProfiles(id))
}

const unassignPermission = (groupId: number, permissionId: number): void => {
  console.log(`permission ${permissionId} removed from group ${groupId}`)
}
const unassignProfile = (groupId: number, profileId: number): void => {
  console.log(`profile ${profileId} removed from group ${groupId}`)
}

export const groupEditorActions = {
  getGroup,
  getGroupProfiles,
  getGroupPermissions,
  unassignProfile,
  unassignPermission,
  resetGroupEditor,
  resetProfilesFilters
}

export const groupEditorReducer = groupEditorSlice.reducer
