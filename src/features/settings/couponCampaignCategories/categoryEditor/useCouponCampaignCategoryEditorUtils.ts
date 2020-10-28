import { useMemo, useCallback } from 'react'
import { CouponCampaignCategory } from 'models/couponCampaignCategory'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { couponCampaignCategoryEditorActions } from './couponCampaignCategoryEditorSlice'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'

interface CouponCampaignCategoryEditorUtilsProps {
  params: Pick<GenericModalFormEditorParams, 'id'>
  handleExit: () => void
  afterClose: () => void
}
interface CouponCampaignCategoryEditorUtils {
  loading: boolean
  initialValues: CouponCampaignCategory
  handleGetCategory: () => void
  handleSave: (values: CouponCampaignCategory) => Promise<void>
  afterCloseExtended: () => void
}
export const useCouponCampaignCategoryEditorUtils = (
  props: CouponCampaignCategoryEditorUtilsProps
): CouponCampaignCategoryEditorUtils => {
  const { params, handleExit, afterClose } = props
  const { id } = params

  const { getCategory, resetCategoryEditor, saveCategory } = couponCampaignCategoryEditorActions
  const dispatch = useDispatch()

  const { category, editorState } = useSelector(
    (state: RootState) => state.couponCampaignCategoryEditor
  )
  const initialValues = useMemo((): CouponCampaignCategory => ({ name: category?.name }), [
    category
  ])

  const loading = editorState === FeatureState.Loading

  const afterCloseExtended = (): void => {
    afterClose()
    dispatch(resetCategoryEditor())
  }

  const handleSave = async (values: CouponCampaignCategory): Promise<void> => {
    const newCategory: CouponCampaignCategory = { id, name: values.name }
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
