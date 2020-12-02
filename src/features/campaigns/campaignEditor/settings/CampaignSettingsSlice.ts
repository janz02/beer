import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { CampaignSettingsFormElements } from 'models/campaign/campaignSettingsFormEelements'

interface CampaignSettingsState {
  campaignSettingsFormElements: CampaignSettingsFormElements
  isLoading: boolean
  hasError: boolean
}

const initialState: CampaignSettingsState = {
  campaignSettingsFormElements: {
    emailResendFrequencies: [],
    emailResendRules: [],
    emailTimeRules: [],
    phoneRecallFrequencies: [],
    phoneTimeRules: [],
    productTypes: [],
    products: [],
    requesters: [],
    responsibles: [],
    timingTypes: []
  },
  isLoading: true,
  hasError: false
}

const campaignSettingsSlice = createSlice({
  name: 'campaignEditorSettings',
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
    }
  }
})

const {
  getCampaignSettingsFormElementsSuccess,
  getCampaignSettingsFormElementsFail,
  getCampaignSettingsFormElements
} = campaignSettingsSlice.actions

export const campaignSettingsReducer = campaignSettingsSlice.reducer

export const getCampaignSettingsElements = (): AppThunk => async dispatch => {
  try {
    dispatch(getCampaignSettingsFormElements())
    const viewModels = await api.campaignEditor.viewModels.createCampaignViewModel()
    const formElements = {
      ...(viewModels as CampaignSettingsFormElements),
      emailTimeRules: [
        { label: 'Weekday', value: 1 },
        { label: 'Weekend', value: 2 },
        { label: 'Feast-day', value: 3 },
        { label: 'Saturday working day', value: 4 }
      ],
      timingTypes: [{ label: 'Timing types', value: 1 }],
      emailResendFrequencies: [{ label: '6 month', value: 1 }],
      emailResendRules: [
        { label: 'Rejected email', value: 1 },
        { label: 'Temporarily rejected email', value: 2 },
        { label: 'Bounced email', value: 3 },
        { label: 'Spam', value: 4 }
      ]
    }

    dispatch(getCampaignSettingsFormElementsSuccess(formElements))
  } catch (err) {
    dispatch(getCampaignSettingsFormElementsFail())
  }
}
