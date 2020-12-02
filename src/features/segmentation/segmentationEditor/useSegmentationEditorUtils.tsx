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
import { QueryBuilderRuleModel } from './queryBuilder/useQueryBuilderUtils'

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
  loading: boolean
  checkFieldsChange: () => void
  handleSave: (
    values: CampaignSegmentation,
    results: SegmentationRuleResult,
    tree: string,
    conditions: QueryBuilderRuleModel[]
  ) => void
  fields?: QueryBuilderField[]
  segmentationQuery?: SegmentationQuery
}

export const useSegmentationEditorUtils = (
  props: SegmentationEditorUtilsProps
): SegmentationEditorUtils => {
  const { id } = props

  const dispatch = useDispatch()
  const { segmentation, categories, fields, segmentationQuery, saving, loading } = useSelector(
    (state: RootState) => state.segmentationEditor
  )

  const formUtils = useFormUtils<Partial<CampaignSegmentation>>()
  const { submitable, modified, setFieldsValue, checkFieldsChange, resetFormFlags } = formUtils

  useEffect(() => {
    setFieldsValue(segmentation || {})
  }, [segmentation, setFieldsValue])

  useEffect(() => {
    dispatch(getSegmentation(id))

    return () => {
      dispatch(resetSegmentationEditor())
    }
  }, [dispatch, id])

  const handleSave = (
    values: CampaignSegmentation,
    results: SegmentationRuleResult,
    tree: string,
    conditions: QueryBuilderRuleModel[]
  ): void => {
    dispatch(saveSegmentation(values, results, tree, conditions))
    resetFormFlags()
  }

  return {
    id,
    formUtils,
    categories,
    submitable,
    modified,
    saving,
    loading,
    fields,
    checkFieldsChange,
    handleSave,
    segmentationQuery
  }
}
