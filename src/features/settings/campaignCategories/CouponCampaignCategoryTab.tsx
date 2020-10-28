import React, { useEffect } from 'react'
import { CouponCampaignCategoryList } from './categoryList/CouponCampaignCategoryList'
import { CouponCampaignCategoryEditor } from './categoryEditor/CouponCampaignCategoryEditor'
import { useDispatch } from 'hooks/react-redux-hooks'
import { couponCampaignCategoryListActions } from './categoryList/couponCampaignCategoryListSlice'
import { GenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { CouponCampaignCategoryListUtils } from './categoryList/useCouponCampaignCategoryListUtils'

export interface CouponCampaignCategoryTabProps {
  categoryListUtils: CouponCampaignCategoryListUtils
  modalUtils: GenericModalFormEditorUtils
}

export const CouponCampaignCategoryTab: React.FC<CouponCampaignCategoryTabProps> = props => {
  const dispatch = useDispatch()
  const { editorParams, handleExit, handleAfterClose } = props.modalUtils

  useEffect(() => {
    dispatch(couponCampaignCategoryListActions.getCategories())
  }, [dispatch])

  return (
    <>
      <CouponCampaignCategoryList categoryListUtils={props.categoryListUtils} />
      <CouponCampaignCategoryEditor
        params={editorParams}
        handleExit={handleExit}
        afterClose={handleAfterClose}
      />
    </>
  )
}
