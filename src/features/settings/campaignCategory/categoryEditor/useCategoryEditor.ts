import { useMemo, useCallback } from 'react'
import { Category } from 'models/category'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { categoryEditorActions } from './categoryEditorSlice'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'

interface UseCategoryEditorProps {
  params: Pick<GenericModalFormEditorParams, 'id'>
  handleExit: () => void
  afterClose: () => void
}
interface UseCategoryEditorUtils {
  loading: boolean
  initialValues: Category
  handleGetCategory: () => void
  handleSave: (values: Category) => Promise<void>
  afterCloseExtended: () => void
}
export const useCategoryEditor = (props: UseCategoryEditorProps): UseCategoryEditorUtils => {
  const { params, handleExit, afterClose } = props
  const { id } = params

  const { getCategory, resetCategoryEditor, saveCategory } = categoryEditorActions
  const dispatch = useDispatch()

  const { category, editorState } = useSelector((state: RootState) => state.categoryEditor)
  const initialValues = useMemo((): Category => ({ name: category?.name }), [category])

  const loading = editorState === FeatureState.Loading

  const afterCloseExtended = (): void => {
    afterClose()
    dispatch(resetCategoryEditor())
  }

  const handleSave = async (values: Category): Promise<void> => {
    const newCategory: Category = { id, name: values.name }
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
