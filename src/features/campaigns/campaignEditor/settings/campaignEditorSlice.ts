import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import {
  CampaignSettingsFormElements,
  TextValuePair
} from 'models/campaign/campaignSettingsFormEelements'

interface CampaignSettingsState {
  campaignSettingsFormElements: CampaignSettingsFormElements
  isLoading: boolean
  hasError: boolean
}

const initialState: CampaignSettingsState = {
  campaignSettingsFormElements: {
    resendFrequencyOptions: [],
    resendingRuleOptions: [],
    intervalRestrictionOptions: [],
    phoneRecallFrequencies: [],
    phoneTimeRules: [],
    products: [],
    users: [],
    timingTypes: [],
    channelOptions: [],
    channels: []
  },
  isLoading: true,
  hasError: false
}

const campaignEditorSlice = createSlice({
  name: 'campaignEditor',
  initialState,
  reducers: {
    getCampaignSettingsFormElements(state) {
      state.isLoading = true
    },
    getCampaignSettingsFormElementsSuccess(
      state,
      action: PayloadAction<CampaignSettingsFormElements>
    ) {
      state.campaignSettingsFormElements = action.payload
      state.isLoading = false
      state.hasError = false
    },
    getCampaignSettingsFormElementsFail(state) {
      state.isLoading = false
      state.hasError = true
    },
    saveCampaignSettingsSuccess(state) {
      state.isLoading = false
      state.hasError = false
    }
  }
})

const {
  getCampaignSettingsFormElementsSuccess,
  getCampaignSettingsFormElementsFail,
  getCampaignSettingsFormElements
} = campaignEditorSlice.actions

export const campaignSettingsReducer = campaignEditorSlice.reducer

export const getCampaignSettingsElements = (): AppThunk => async dispatch => {
  try {
    dispatch(getCampaignSettingsFormElements())
    const viewModels = await api.campaignEditor.campaigns.settings()
    const formElements = {
      ...(viewModels as CampaignSettingsFormElements),
      resendFrequencyOptions: viewModels.channelOptions?.email
        ?.resendFrequencyOptions as TextValuePair[],
      resendingRuleOptions: viewModels.channelOptions?.email
        ?.resendingRuleOptions as TextValuePair[]
    }

    dispatch(getCampaignSettingsFormElementsSuccess(formElements))
  } catch (err) {
    dispatch(getCampaignSettingsFormElementsFail())
  }
}
export const saveSettings = (campaignSettings: any): AppThunk => async () => {
  try {
    console.log(campaignSettings)
  } catch (error) {
    console.log(error)
  }
}

export const campaignSettingsActions = {
  saveSettings
}
