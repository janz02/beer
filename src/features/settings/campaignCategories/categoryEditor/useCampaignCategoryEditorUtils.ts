import { useMemo, useCallback } from 'react'
import { CampaignCategory } from 'models/campaign/campaignCategory'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { campaignCategoryEditorActions } from './campaignCategoryEditorSlice'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'

interface CampaignCategoryEditorUtilsProps {
  params: Pick<GenericModalFormEditorParams, 'id'>
  handleExit: () => void
  afterClose: () => void
}
interface CampaignCategoryEditorUtils {
  loading: boolean
  initialValues: CampaignCategory
  handleGetCategory: () => void
  handleSave: (values: CampaignCategory) => Promise<void>
  afterCloseExtended: () => void
}
export const useCampaignCategoryEditorUtils = (
  props: CampaignCategoryEditorUtilsProps
): CampaignCategoryEditorUtils => {
  const { params, handleExit, afterClose } = props
  const { id } = params

  const { getCategory, resetCategoryEditor, saveCategory } = campaignCategoryEditorActions
  const dispatch = useDispatch()

  const { category, editorState } = useSelector((state: RootState) => state.campaignCategoryEditor)
  const initialValues = useMemo((): CampaignCategory => ({ name: category?.name }), [category])

  const loading = editorState === FeatureState.Loading

  const afterCloseExtended = (): void => {
    afterClose()
    dispatch(resetCategoryEditor())
  }

  const handleSave = async (values: CampaignCategory): Promise<void> => {
    const newCategory: CampaignCategory = { id, name: values.name }
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
