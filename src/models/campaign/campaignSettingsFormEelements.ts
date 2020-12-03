export interface TextValuePair {
  text: string
  value: number
}

export interface CampaignSettingsFormElements {
  products: TextValuePair[]
  users: TextValuePair[]
  channels: TextValuePair[]
  timingTypes: TextValuePair[]
  intervalRestrictionOptions: TextValuePair[]
  channelOptions: TextValuePair[]
  resendingRuleOptions: TextValuePair[]
  resendFrequencyOptions: TextValuePair[]

  phoneTimeRules: TextValuePair[]
  phoneRecallFrequencies: TextValuePair[]
}
