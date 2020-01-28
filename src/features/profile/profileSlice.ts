import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { message } from 'antd'
import i18n from 'app/i18n'
import { Profile } from 'models/profile'
import { api } from 'api'
import { Partner } from 'models/partner'

interface ProfileState {
  partner?: Partner
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
    getProfilesSuccess(state, action: PayloadAction<Partner>) {
      state.partner = action.payload
      state.profile = action.payload.contacts ? action.payload.contacts[0] : {}

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

export const getProfiles = (): AppThunk => async (dispatch, getState) => {
  dispatch(setLoadingStart())

  try {
    const id = getState().auth.userData.partnerId
    if (id) {
      const partner = await api.partner.getPartners({ id })
      dispatch(getProfilesSuccess({ ...partner }))
    }
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}

export const updateProfiles = (profile: Profile): AppThunk => async (dispatch, getState) => {
  dispatch(setLoadingStart())

  try {
    const id = getState().auth.userData.partnerId
    const profileToSave = { ...getState().profile.profile, ...profile, id: undefined }

    if (id) {
      await api.partner.updatePartners({
        id,
        partnerDto: {
          ...getState().profile.partner
          // contacts: [profileToSave]
        }
      })

      dispatch(updateProfileSuccess())
    }
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}
