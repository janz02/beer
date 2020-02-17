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
    getProfileSuccess(state, action: PayloadAction<Profile>) {
      state.editable = true
      state.profile = action.payload
      state.loading = false
      state.error = null
    },
    getProfileFallback(state, action: PayloadAction<Profile>) {
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
  getProfileSuccess,
  getProfileFallback,
  updateProfileSuccess,
  setLoadingStart,
  setLoadingFailed
} = profileSlice.actions

export default profileSlice.reducer

export const getProfile = (): AppThunk => async (dispatch, getState) => {
  dispatch(setLoadingStart())

  try {
    const userData = getState().auth.userData
    const id = userData.partnerId
    if (id) {
      const partner = await api.partner.getPartners()
      if (partner.contacts && partner.contacts[0].id) {
        const profile = await api.partnerContacts.getPartnerContacts()
        dispatch(getProfileSuccess({ ...profile }))
      }
    } else {
      const jwtProfile: Profile = { name: userData.userName, email: userData.email }
      dispatch(getProfileFallback({ ...jwtProfile }))
    }
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}

export const updateProfile = (profile: Profile): AppThunk => async (dispatch, getState) => {
  dispatch(setLoadingStart())

  try {
    const id = getState().auth.userData.partnerId
    if (id) {
      const partner = await api.partner.getPartners()
      if (partner.contacts && partner.contacts[0].id) {
        await api.partnerContacts.updatePartnerContacts({
          partnerContactDto: { ...getState().profile.profile, ...profile }
        })

        dispatch(updateProfileSuccess())
      }
    }
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}
