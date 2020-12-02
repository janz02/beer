import { OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm } from 'api/swagger/campaign-editor/models'

export class LabelValuePair {
  label!: string
  value!: number
}

export class CampaignSettingsFormElements {
  constructor(
    from: OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm | null
  ) {
    if (from) {
      this.productTypes = (from.productTypes as LabelValuePair[]) ?? []
      this.products = (from.products as LabelValuePair[]) ?? []
      this.requesters = (from.requesters as LabelValuePair[]) ?? []
      this.responsibles = (from.responsibles as LabelValuePair[]) ?? []
    }
  }

  products: LabelValuePair[] = []
  responsibles: LabelValuePair[] = []
  requesters: LabelValuePair[] = []
  productTypes: LabelValuePair[] = []
  channelTypes: LabelValuePair[] = []
  timingTypes: LabelValuePair[] = [{ label: 'Timing types', value: 1 }]
  emailTimeRules: LabelValuePair[] = [
    { label: 'Weekday', value: 1 },
    { label: 'Weekend', value: 2 },
    { label: 'Feast-day', value: 3 },
    { label: 'Saturday working day', value: 4 }
  ]

  emailResendRules: LabelValuePair[] = []
  emailResendFrequencies: LabelValuePair[] = []
  phoneTimeRules: LabelValuePair[] = []
  phoneRecallFrequencies: LabelValuePair[] = []
}
