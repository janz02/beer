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
    const formElements = { ...(viewModels as CampaignSettingsFormElements) }

    dispatch(getCampaignSettingsFormElementsSuccess(formElements))
  } catch (err) {
    dispatch(getCampaignSettingsFormElementsFail())
  }
}
