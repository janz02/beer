import { useMemo, useCallback } from 'react'
import { SegmentationCategory } from 'models/segmentationCategory'
import { useSelector, useDispatch } from '../../../../hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { segmentationCategoryEditorActions } from './segmentationCategoryEditorSlice'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'

interface UseSegmentationCategoryEditorProps {
  params: Pick<GenericModalFormEditorParams, 'id'>
  handleExit: () => void
  afterClose: () => void
}
interface UseSegmentationCategoryEditorUtils {
  loading: boolean
  initialValues: SegmentationCategory
  handleGetCategory: () => void
  handleSave: (values: SegmentationCategory) => Promise<void>
  afterCloseExtended: () => void
}
export const useSegmentationCategoryEditor = (
  props: UseSegmentationCategoryEditorProps
): UseSegmentationCategoryEditorUtils => {
  const { params, handleExit, afterClose } = props
  const { id } = params

  const { getCategory, resetCategoryEditor, saveCategory } = segmentationCategoryEditorActions
  const dispatch = useDispatch()

  const { category, editorState } = useSelector(
    (state: RootState) => state.segmentationCategoryEditor
  )
  const initialValues = useMemo((): SegmentationCategory => ({ name: category?.name }), [category])

  const loading = editorState === FeatureState.Loading

  const afterCloseExtended = (): void => {
    afterClose()
    dispatch(resetCategoryEditor())
  }

  const handleSave = async (values: SegmentationCategory): Promise<void> => {
    const newCategory: SegmentationCategory = { id, name: values.name }
    const saved: any = await dispatch(saveCategory(newCategory))
    saved && handleExit()
  }

  const handleGetCategory = useCallback(() => {
    id && dispatch(getCategory({ id }))
  }, [id, dispatch, getCategory])

  return {
    loading,
    initialValues,
    handleGetCategory,
    handleSave,
    afterCloseExtended
  }
}
