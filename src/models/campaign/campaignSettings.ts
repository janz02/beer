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
    startTime: moment.Moment
    endTime: moment.Moment
    intervalRestrictionOptions: number[]
  }
  emailChannelSettings: {
    resendingRuleOptions: number[]
    emailResendFrequencyId: number
    emailMaxReSends: number
  }
}
