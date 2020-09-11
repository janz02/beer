import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { message } from 'antd'
import i18n from 'app/i18n'
import { Profile } from 'models/profile'
import { couponApi } from 'api'
import { FeatureState } from 'models/featureState'

interface ProfileState {
  editable?: boolean
  profile?: Profile
  featureState: FeatureState
}

const initialState: ProfileState = {
  featureState: FeatureState.Initial
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: () => initialState,
    setFeatureState(state, action: PayloadAction<FeatureState>) {
      state.featureState = action.payload
    },
    getProfileSuccess(state, action: PayloadAction<Profile>) {
      state.editable = true
      state.profile = action.payload
      state.featureState = FeatureState.Success
    },
    updateProfileSuccess(state) {
      message.success(i18n.t('profile.save-profile-success'), 10)
      state.featureState = FeatureState.Success
    }
  }
})

const {
  resetProfile,
  getProfileSuccess,
  updateProfileSuccess,
  setFeatureState
} = profileSlice.actions

const getProfile = (): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    const profile = await couponApi.partnerContacts.getMyPartnerContact()

    dispatch(getProfileSuccess(profile))
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const updateProfile = (profile: Profile): AppThunk => async (dispatch, getState) => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    await couponApi.partnerContacts.updateMyPartnerContact({
      partnerContactSelfDto: { ...getState().profile.profile, ...profile }
    })

    dispatch(updateProfileSuccess())
    dispatch(getProfile())
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

export const profileActions = {
  resetProfile,
  getProfile,
  updateProfile
}

export const profileReducer = profileSlice.reducer
