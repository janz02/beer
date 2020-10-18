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
}

export const useSegmentationEditorUtils = (
  props: SegmentationEditorUtilsProps
): SegmentationEditorUtils => {
  const { id } = props

  const dispatch = useDispatch()
  const { segmentation, categories, loading } = useSelector(
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

  return { id, formUtils, categories, loading, submitable, modified, checkFieldsChange, handleSave }
}
