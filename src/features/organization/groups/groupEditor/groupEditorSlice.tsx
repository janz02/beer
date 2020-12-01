import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from 'api'
import { AppThunk } from 'app/store'
import { FeatureState } from 'models/featureState'
import { Group } from 'models/group'
import { Profile } from 'models/profile'
import moment from 'moment'

interface GroupEditorState {
  group?: Group
  profiles: Profile[]
  editing?: boolean
  featureState: FeatureState
}

const initialState: GroupEditorState = {
  profiles: [],
  featureState: FeatureState.Initial
}

export const groupEditorSlice = createSlice({
  name: 'groupEditor',
  initialState,
  reducers: {
    resetGroupEditor: () => initialState,
    setFeatureState(state, action: PayloadAction<FeatureState>) {
      state.featureState = action.payload
    },
    setGroup: (state, action: PayloadAction<Group | undefined>): void => {
      state.group = action.payload
    },
    getGroupSuccess(state, action: PayloadAction<Group>) {
      state.group = action.payload
      state.featureState = FeatureState.Success
    },
    setEditing(state, action: PayloadAction<boolean>) {
      state.editing = action.payload
    },
    setProfiles: (state, action: PayloadAction<Profile[]>): void => {
      state.profiles = action.payload
    }
  }
})

export const {
  resetGroupEditor,
  setEditing,
  setProfiles,
  getGroupSuccess,
  setFeatureState
} = groupEditorSlice.actions

const getGroup = (id: number): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    const group = await api.admin.groups.getOrganizationGroup({ id })
    dispatch(
      getGroupSuccess({
        ...group,
        createdDate: group.createdDate && moment(group.createdDate)
      } as Group)
    )
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

export const groupEditorActions = {
  getGroup,
  resetGroupEditor
}

export const groupEditorReducer = groupEditorSlice.reducer
