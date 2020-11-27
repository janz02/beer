import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { message } from 'antd'
import i18n from 'app/i18n'
import { MyProfile } from 'models/myProfile'
import { api } from 'api'
import { FeatureState } from 'models/featureState'

interface ProfileState {
  editable?: boolean
  profile?: MyProfile
  featureState: FeatureState
}

const initialState: ProfileState = {
  featureState: FeatureState.Initial
}

const profileSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    resetProfile: () => initialState,
    setFeatureState(state, action: PayloadAction<FeatureState>) {
      state.featureState = action.payload
    },
    getProfileSuccess(state, action: PayloadAction<MyProfile>) {
      state.editable = true
      state.profile = action.payload
      state.featureState = FeatureState.Success
    },
    updateProfileSuccess(state) {
      message.success(i18n.t('my-profile.save-profile-success'), 10)
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

const getMyProfile = (): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    const profile = await api.coupon.partnerContacts.getMyPartnerContact({})

    dispatch(getProfileSuccess(profile))
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const updateMyProfile = (profile: MyProfile): AppThunk => async (dispatch, getState) => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    await api.coupon.partnerContacts.updateMyPartnerContact({
      partnerContactSelfDto: { ...getState().myProfile.profile, ...profile }
    })

    dispatch(updateProfileSuccess())
    dispatch(getMyProfile())
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

export const myProfileActions = {
  resetProfile,
  getMyProfile,
  updateMyProfile
}

export const myProfileReducer = profileSlice.reducer