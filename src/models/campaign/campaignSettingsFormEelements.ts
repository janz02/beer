import { OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm } from 'api/swagger/campaign-editor/models'

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

// export class CampaignSettingsFormElements {
//   products: LabelValuePair[] = []
//   responsibles: LabelValuePair[] = []
//   requesters: LabelValuePair[] = []
//   productTypes: LabelValuePair[] = []
//   channelTypes: LabelValuePair[] = []
//   timingTypes: LabelValuePair[] = [{ label: 'Timing types', value: 1 }]
//   emailTimeRules: LabelValuePair[] = [
//     { label: 'Weekday', value: 1 },
//     { label: 'Weekend', value: 2 },
//     { label: 'Feast-day', value: 3 },
//     { label: 'Saturday working day', value: 4 }
//   ]

//   emailResendRules: LabelValuePair[] = []
//   emailResendFrequencies: LabelValuePair[] = []
//   phoneTimeRules: LabelValuePair[] = []
//   phoneRecallFrequencies: LabelValuePair[] = []
// }
