import { RootState } from 'app/rootReducer'
import { FormUtils, useFormUtils } from 'hooks/useFormUtils'
import { CampaignSegmentation } from 'models/campaign/campaignSegmentation'
import { QueryBuilderField } from 'models/campaign/queryBuilderField'
import { SegmentationCategory } from 'models/campaign/segmentationCategory'
import { SegmentationQuery } from 'models/campaign/segmentationQuery'
import { SegmentationRuleResult } from 'models/campaign/segmentationRuleResult'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
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
  handleSave: (values: CampaignSegmentation, results: SegmentationRuleResult) => void
  fields?: QueryBuilderField[]
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

  const handleSave = (values: CampaignSegmentation, results: SegmentationRuleResult): void => {
    dispatch(saveSegmentation(values, results))
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
