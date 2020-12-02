import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { CampaignSettingsFormElements } from 'models/campaign/campaignSettingsFormEelements'
import { OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm } from 'api/swagger/campaign-editor/models'

interface CampaignSettingsState {
  campaignSettingsFormElements: CampaignSettingsFormElements
  loading: boolean
  error: boolean
}

const initialState: CampaignSettingsState = {
  campaignSettingsFormElements: new CampaignSettingsFormElements(null),
  loading: false,
  error: false
}

const campaignSettingsSlice = createSlice({
  name: 'campaignEditorSettings',
  initialState,
  reducers: {
    getCampaignSettingsFormElements(state) {
      state.loading = true
    },
    getCampaignSettingsFormElementsSuccess(
      state,
      action: PayloadAction<CampaignSettingsFormElements>
    ) {
      const alma = action.payload as CampaignSettingsFormElements
      state.campaignSettingsFormElements = action.payload
      state.loading = false
      state.error = false
    },
    getCampaignSettingsFormElementsFail(state) {
      state.loading = false
      state.error = true
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
    const alma = new CampaignSettingsFormElements(viewModels)

    dispatch(getCampaignSettingsFormElementsSuccess(alma))
  } catch (err) {
    dispatch(getCampaignSettingsFormElementsFail())
  }
}
