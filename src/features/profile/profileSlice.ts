import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { message } from 'antd'
import i18n from 'app/i18n'
import { Profile } from 'models/profile'
import { api } from 'api'

interface ProfileState {
  editable?: boolean
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
    resetProfile: () => initialState,
    getProfileSuccess(state, action: PayloadAction<Profile>) {
      state.editable = true
      state.profile = action.payload
      state.loading = false
      state.error = null
    },
    setProfileFromJWT(state, action: PayloadAction<Profile>) {
      state.editable = false
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
  resetProfile,
  getProfileSuccess,
  setProfileFromJWT,
  updateProfileSuccess,
  setLoadingStart,
  setLoadingFailed
} = profileSlice.actions

export const profileReducer = profileSlice.reducer

export const getProfile = (): AppThunk => async (dispatch, getState) => {
  dispatch(setLoadingStart())

  try {
    // const userData = getState().auth.userData
    // TODO: The roles have changed, no more Partner contact. Do we need this check, still?
    // if (!userData.roles?.includes(Roles.Partner)) {
    const profile = await api.partnerContacts.getSelfPartnerContact()
    dispatch(getProfileSuccess(profile))
    // } else {
    // dispatch(setProfileFromJWT({ name: userData.email, email: userData.email }))
    // }
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}

export const updateProfile = (profile: Profile): AppThunk => async (dispatch, getState) => {
  dispatch(setLoadingStart())

  try {
    // const userData = getState().auth.userData
    // if (userData.roles?.includes(Roles.PARTNER)) {
    await api.partnerContacts.updateSelfPartnerContact({
      selfPartnerContactDto: { ...getState().profile.profile, ...profile }
    })
    dispatch(updateProfileSuccess())
    dispatch(getProfile())
    // }
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}
