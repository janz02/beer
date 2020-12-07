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
} = campaignSettingsSlice.actions

export const campaignSettingsReducer = campaignSettingsSlice.reducer

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
    // Csinani egy tipust amibe atmappelni es megcsinalni a savet
    // Validacio a formon
    // rangepicker

    // const alma = {
    //   optimaCampaignEditorApplicationCampaignsCommandsCreateCampaignSettingsCreateCampaignSettingsCommand: {
    //     ...campaignSettings,
    //     timing: {
    //       ...campaignSettings.timing,
    //       startDate: (campaignSettings.timing?.startDate as moment.Moment).toDate(),
    //       endDate: (campaignSettings.timing?.endDate as moment.Moment).toDate(),
    //       startTime: null,
    //       endTime: null
    //     }
    //   }
    // }
    // console.log(alma)
    // await api.campaignEditor.campaigns.createCampaignsettings(alma)
    // dispatch(saveCampaignSettingsSuccess())
    console.log(campaignSettings)
  } catch (error) {
    console.log(error)
  }
}

export const campaignSettingsActions = {
  saveSettings
}
