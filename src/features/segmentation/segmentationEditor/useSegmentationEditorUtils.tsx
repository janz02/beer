import { QueryBuilderField } from 'api/swagger/campaign-editor/models'
import { RootState } from 'app/rootReducer'
import { UseFormUtils, useFormUtils } from 'hooks/useFormUtils'
import { CampaignSegmentation } from 'models/campaign/campaignSegmentation'
import { SegmentationCategory } from 'models/campaign/segmentationCategory'
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
  formUtils: UseFormUtils
  categories?: SegmentationCategory[]
  loading: boolean
  submitable: boolean
  modified: boolean
  checkFieldsChange: () => void
  handleSave: (values: CampaignSegmentation) => void
  fields?: QueryBuilderField[]
  handleOnSidebarFieldSelected: (selectedField: string) => void
}

export const useSegmentationEditorUtils = (
  props: SegmentationEditorUtilsProps
): SegmentationEditorUtils => {
  const { id } = props

  const dispatch = useDispatch()
  const { segmentation, categories, fields, loading } = useSelector(
    (state: RootState) => state.segmentationEditor
  )

  const formUtils = useFormUtils<Partial<CampaignSegmentation>>()
  const { submitable, modified, setFieldsValue, checkFieldsChange } = formUtils

  useEffect(() => {
    setFieldsValue(segmentation)
  }, [segmentation, setFieldsValue])

  useEffect(() => {
    if (id) {
      dispatch(getSegmentation(+id))
    }

    return () => {
      dispatch(resetSegmentationEditor())
    }
  }, [dispatch, id])

  const handleSave = (values: CampaignSegmentation): void => {
    dispatch(saveSegmentation(values))
  }

  const handleOnSidebarFieldSelected = (selectedField: string): void => {
    console.log(selectedField)
  }

  return {
    id,
    formUtils,
    categories,
    loading,
    submitable,
    modified,
    fields,
    checkFieldsChange,
    handleSave,
    handleOnSidebarFieldSelected
  }
}
