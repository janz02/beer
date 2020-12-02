export class LabelValuePair {
  label!: string
  value!: number
}

export interface CampaignSettingsFormElements {
  products: LabelValuePair[]
  responsibles: LabelValuePair[]
  requesters: LabelValuePair[]
  productTypes: LabelValuePair[]
  timingTypes: LabelValuePair[]
  emailTimeRules: LabelValuePair[]
  emailResendRules: LabelValuePair[]
  emailResendFrequencies: LabelValuePair[]
  phoneTimeRules: LabelValuePair[]
  phoneRecallFrequencies: LabelValuePair[]
}
