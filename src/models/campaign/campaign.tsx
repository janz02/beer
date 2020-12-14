import { TextValuePair } from 'models/textValuePair'
import { Time } from './campaignSettings'

export interface Campaign {
  id?: number
  name?: string | null

  createdDate?: moment.Moment
  modifiedDate?: moment.Moment | null
  requester?: TextValuePair | null
  department?: string | null
  responsible?: TextValuePair | null
  comment?: string | null
  createdBy?: TextValuePair | null
  modifiedBy?: TextValuePair | null
  status?: TextValuePair | null
  statusIsProcessing?: boolean

  settings?: CampaignBaseSettings | null
  channelSettings?: CampaignEmailSettings | CampaignSmsSettings | null
  content?: CampaignEmailContent | CampaignSmsContent | null
}
export interface CampaignBaseSettings {
  channel?: TextValuePair | null
  startDate?: moment.Moment
  endDate?: moment.Moment | null
  product?: TextValuePair | null
}

export interface CampaignEmailSettings {
  treatmentStartDate?: moment.Moment | null
  treatmentEndDate?: moment.Moment | null
  treatmentStartTime?: Time | null
  treatmentEndTime?: Time | null
  timeRules?: Array<TextValuePair> | null
  resendOrRecallRules?: Array<TextValuePair> | null
  resendFrequency?: TextValuePair | null
  maxResends?: number | null
  timingTypeId?: number
}

export interface CampaignSmsSettings {
  resendOrRecallRules?: Array<TextValuePair> | null
}

export interface CampaignEmailContent {
  emailTemplateId?: number
  emailTemplateVersion?: number
}
export interface CampaignSmsContent {
  message?: string
}
