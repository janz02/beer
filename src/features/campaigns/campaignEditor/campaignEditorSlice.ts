import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { CampaignSettingsFormElements } from 'models/campaign/campaignSettingsFormElements'
import { TextValuePair } from 'models/textValuePair'
import {
  Campaign,
  CampaignBaseSettings,
  CampaignEmailContent,
  CampaignEmailSettings
} from 'models/campaign/campaign'
import moment from 'moment'
import { CampaignDetailRequest } from 'api/swagger/campaign-editor'
import { CampaignSettingsUpdateDto } from 'models/campaign/campaignSettings'
import i18n from 'app/i18n'
import { message } from 'antd'

interface CampaignEditorState {
  campaignSettingsFormElements: CampaignSettingsFormElements
  campaign?: Campaign
  isLoading: boolean
  hasError: boolean
}

const initialState: CampaignEditorState = {
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
    reset: () => initialState,
    getCampaignStarted(state) {
      state.isLoading = true
    },
    getCampaignSuccess(state, action: PayloadAction<Campaign>) {
      state.campaign = action.payload
      state.isLoading = false
      state.hasError = false
    },
    getCampaignFail(state) {
      state.isLoading = false
      state.hasError = true
    },
    getCampaignSettingsFormElementsSuccess(
      state,
      action: PayloadAction<CampaignSettingsFormElements>
    ) {
      state.campaignSettingsFormElements = action.payload
      state.isLoading = false
      state.hasError = false
    },
    saveCampaignSettingsSuccess(state) {
      state.isLoading = false
      state.hasError = false
    },
    saveCampaignSettingsFailure(state) {
      state.isLoading = false
      state.hasError = true
    }
  }
})

const {
  reset,
  getCampaignStarted,
  getCampaignFail,
  getCampaignSuccess,
  getCampaignSettingsFormElementsSuccess,
  saveCampaignSettingsSuccess,
  saveCampaignSettingsFailure
} = campaignEditorSlice.actions

export const campaignEditorReducer = campaignEditorSlice.reducer

export const getCampaignSettingsElements = (): AppThunk => async dispatch => {
  try {
    dispatch(getCampaignStarted())
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
    dispatch(getCampaignFail())
  }
}

export const getCampaign = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getCampaignStarted())

    const campaignDetail = await api.campaignEditor.campaigns.campaignDetail({
      campaignid: id
    } as CampaignDetailRequest)

    const campaign = {
      id: campaignDetail.id,
      name: campaignDetail.name,
      createdDate: moment(campaignDetail.startDate), // createdDate),
      modifiedDate: moment(campaignDetail.endDate), // modifiedDate),
      requester: campaignDetail.requester as TextValuePair,
      department: campaignDetail.department,
      responsible: campaignDetail.responsible as TextValuePair,
      comment: campaignDetail.comment,
      createdBy: campaignDetail.createdBy as TextValuePair,
      modifiedBy: campaignDetail.modifiedBy as TextValuePair,
      status: campaignDetail.status as TextValuePair,
      statusIsProcessing: campaignDetail.statusIsProcessing,
      settings: {
        channel: campaignDetail.channel as TextValuePair,
        startDate: moment(campaignDetail.startDate),
        endDate: moment(campaignDetail.endDate),
        product: campaignDetail.product as TextValuePair
      } as CampaignBaseSettings,
      channelSettings: {
        treatmentStartDate: moment(campaignDetail.treatmentStartDate),
        treatmentEndDate: moment(campaignDetail.treatmentEndDate),
        treatmentStartTime: campaignDetail.treatmentStartTime,
        treatmentEndTime: campaignDetail.treatmentEndTime,
        timeRules: campaignDetail.timeRules as Array<TextValuePair>,
        resendOrRecallRules: campaignDetail.resendOrRecallRules as Array<TextValuePair>,
        resendFrequency: campaignDetail.resendFrequency as TextValuePair,
        maxResends: campaignDetail.maxResends,
        timingTypeId: campaignDetail.timingTypeId
      } as CampaignEmailSettings,
      content: {
        emailTemplateId: campaignDetail.emailTemplateId,
        emailTemplateVersion: campaignDetail.emailTemplateVersion
      } as CampaignEmailContent
    }

    dispatch(getCampaignSuccess(campaign))
  } catch (err) {
    dispatch(getCampaignFail())
  }
}

export const updateEmailContent = (
  id: number,
  emailTemplateId: number,
  emailTemplateVersion: number
): AppThunk => async dispatch => {
  try {
    dispatch(getCampaignStarted())
    const response = await api.campaignEditor.campaigns.updateCampaignContent({
      optimaCampaignEditorApplicationCampaignsCommandsUpdateCampaignContentUpdateCampaignContentCommand: {
        id,
        emailTemplateId,
        emailTemplateVersion
      }
    })

    console.log(response)
    message.success(i18n.t('common.message.save-success'), 5)
  } catch (err) {
    dispatch(getCampaignFail())
  }
}

export const saveSettings = (
  campaignSettings: CampaignSettingsUpdateDto
): AppThunk => async dispatch => {
  try {
    const settings = {
      optimaCampaignEditorApplicationCampaignsCommandsCreateCampaignSettingsCreateCampaignSettingsCommand: {
        ...campaignSettings,
        timing: {
          ...campaignSettings.timing,
          startDate: campaignSettings.timing?.startDate?.toDate(),
          endDate: campaignSettings.timing?.endDate?.toDate()
        },
        emailChannelSettings: { ...campaignSettings.emailChannelSettings }
      }
    }
    await api.campaignEditor.campaigns.createCampaignsettings(settings)
    dispatch(saveCampaignSettingsSuccess())
  } catch (error) {
    dispatch(saveCampaignSettingsFailure())
  }
}

export const campaignEditorActions = {
  saveSettings,
  updateEmailContent,
  getCampaign,
  reset
}
