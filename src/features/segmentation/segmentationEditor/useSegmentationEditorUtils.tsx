import { NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderField } from 'api/swagger/campaign-editor/models'
import { RootState } from 'app/rootReducer'
import { FormUtils, useFormUtils } from 'hooks/useFormUtils'
import { CampaignSegmentation } from 'models/campaign/campaignSegmentation'
import { SegmentationCategory } from 'models/campaign/segmentationCategory'
import { SegmentationQuery } from 'models/campaign/segmentationQuery'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSegmentation,
  resetSegmentationEditor,
  saveSegmentation
} from './segmentationEditorSlice'

interface SegmentationEditorUtilsProps {
  id?: number
}

export interface SegmentationEditorUtils {
  id?: number
  formUtils: FormUtils
  categories?: SegmentationCategory[]
  submitable: boolean
  modified: boolean
  saving: boolean
  checkFieldsChange: () => void
  handleSave: (values: CampaignSegmentation) => void
  fields?: NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderField[]
  segmentationQuery?: SegmentationQuery
}

export const useSegmentationEditorUtils = (
  props: SegmentationEditorUtilsProps
): SegmentationEditorUtils => {
  const { id } = props

  const dispatch = useDispatch()
  const { segmentation, categories, fields, segmentationQuery, saving } = useSelector(
    (state: RootState) => state.segmentationEditor
  )

  const formUtils = useFormUtils<Partial<CampaignSegmentation>>()
  const { submitable, modified, setFieldsValue, checkFieldsChange } = formUtils

  useEffect(() => {
    setFieldsValue(segmentation || {})
  }, [segmentation, setFieldsValue])

  useEffect(() => {
    dispatch(getSegmentation(id))

    return () => {
      dispatch(resetSegmentationEditor())
    }
  }, [dispatch, id])

  const handleSave = (values: CampaignSegmentation): void => {
    dispatch(saveSegmentation(values))
  }

  return {
    id,
    formUtils,
    categories,
    submitable,
    modified,
    saving,
    fields,
    checkFieldsChange,
    handleSave,
    segmentationQuery
  }
}
