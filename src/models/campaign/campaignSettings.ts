export interface CampaignSettingsUpdateDto {
  name: string
  description: string
  channelId: number
  productId: number
  requestorId: number
  responsibleId: number
  timing: {
    timingTypeId: number
    startDate: moment.Moment
    endDate: moment.Moment
    startTime: Time | null
    endTime: Time | null
    intervalRestrictionOptions: number[]
  }
  emailChannelSettings: {
    resendingRuleOptions: number[]
    emailResendFrequencyId: number
    emailMaxReSends: number
  }
}

export interface Time {
  hours: number
  minutes: number
  seconds: number
}
