import { useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'
import { TestGroupCategory } from 'models/campaign/testGroupCategory'
import { testGroupCategoryEditorActions } from './testGroupCategoryEditorSlice'

interface CategoryEditorUtilsProps {
  params: Pick<GenericModalFormEditorParams, 'id'>
  handleExit: () => void
  afterClose: () => void
}
interface CategoryEditorUtils {
  loading: boolean
  initialValues: TestGroupCategory
  handleGetCategory: () => void
  handleSave: (values: TestGroupCategory) => Promise<void>
  afterCloseExtended: () => void
}
export const useTestGroupCategoryEditorUtils = (
  props: CategoryEditorUtilsProps
): CategoryEditorUtils => {
  const { params, handleExit, afterClose } = props
  const { id } = params

  const { getCategory, resetCategoryEditor, saveCategory } = testGroupCategoryEditorActions
  const dispatch = useDispatch()

  const { category, editorState } = useSelector((state: RootState) => state.testGroupCategoryEditor)
  const initialValues = useMemo((): TestGroupCategory => ({ name: category?.name }), [category])

  const loading = editorState === FeatureState.Loading

  const afterCloseExtended = (): void => {
    afterClose()
    dispatch(resetCategoryEditor())
  }

  const handleSave = async (values: TestGroupCategory): Promise<void> => {
    const newCategory: TestGroupCategory = { id, name: values.name }
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
