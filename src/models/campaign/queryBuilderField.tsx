import { NKMRTDCampaignEditorApplicationModelsSegmentationOperator } from 'api/swagger/campaign-editor'

export interface QueryBuilderField {
  fieldName?: string | null
  label?: string | null
  selectedLabel?: string | null
  type?: string | null
  operators?: Array<NKMRTDCampaignEditorApplicationModelsSegmentationOperator> | null
  listValues?: { [key: string]: string } | null
  subFields?: Array<QueryBuilderField> | null
}
