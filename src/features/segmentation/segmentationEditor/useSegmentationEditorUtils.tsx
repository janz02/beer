import { QueryBuilderField } from 'api/swagger/campaign-editor/models'
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
  }, [dispatch, segmentation, formUtils])

  const handleOnSidebarFieldSelected = (selectedField: string): void => {
    console.log(selectedField)
  }

  return { formUtils, categories, fields, handleOnSidebarFieldSelected }
}
