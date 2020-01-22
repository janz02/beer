import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { message } from 'antd'
import i18n from 'app/i18n'
import { Profile } from 'models/profile'

interface ProfileState {
  profile?: Profile
  error: string | null
  loading: boolean
}

const initialState: ProfileState = {
  error: null,
  loading: false
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfilesSuccess(state, action: PayloadAction<Profile>) {
      state.profile = action.payload

      state.loading = false
      state.error = null
    },
    updateProfileSuccess(state) {
      message.success(i18n.t('profile.save-profile-success'), 10)
      state.loading = false
      state.error = null
    },
    setLoadingStart(state) {
      state.loading = true
    },
    setLoadingFailed(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  getProfilesSuccess,
  updateProfileSuccess,
  setLoadingStart,
  setLoadingFailed
} = profileSlice.actions

export default profileSlice.reducer

export const getProfiles = (): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  const profile: Profile = {
    id: 1,
    name: 'Kiss Pista',
    email: 'a@a.com',
    phone: '+36201111111'
  }
  dispatch(getProfilesSuccess(profile))
}

export const updateProfiles = (profile: Profile): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  // TODO: integrate
  dispatch(updateProfileSuccess())
}
