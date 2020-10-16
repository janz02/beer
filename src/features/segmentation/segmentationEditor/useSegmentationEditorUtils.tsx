import { RootState } from 'app/rootReducer'
import { UseFormUtils, useFormUtils } from 'hooks/useFormUtils'
import { SegmentationCategory } from 'models/campaign/segmentationCategory'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSegmentation, resetSegmentationEditor } from './segmentationEditorSlice'

interface SegmentationEditorUtilsProps {
  id?: number
}

export interface SegmentationEditorUtils {
  formUtils: UseFormUtils
  categories?: SegmentationCategory[]
}

export const useSegmentationEditorUtils = (
  props: SegmentationEditorUtilsProps
): SegmentationEditorUtils => {
  const { id } = props

  const dispatch = useDispatch()
  const { segmentation, categories, loading } = useSelector(
    (state: RootState) => state.segmentationEditor
  )

  const formUtils = useFormUtils<{}>()

  useEffect(() => {
    if (id) {
      dispatch(getSegmentation(+id))
    }

    return () => {
      dispatch(resetSegmentationEditor())
    }
  }, [dispatch, id])

  useEffect(() => {
    formUtils.setFieldsValue({
      name: segmentation?.name ?? '',
      categoryId: segmentation?.segmentationCategoryId
    })
  }, [dispatch, segmentation])

  return { formUtils, categories }
}
