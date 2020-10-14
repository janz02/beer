import React, { useEffect } from 'react'
import { CampaignCategoryList } from './categoryList/CampaignCategoryList'
import { CampaignCategoryEditor } from './categoryEditor/CampaignCategoryEditor'
import { useDispatch } from 'hooks/react-redux-hooks'
import { campaignCategoryListActions } from './categoryList/campaignCategoryListSlice'
import { UseGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { CampaignCategoryListUtils } from './categoryList/useCampaignCategoryListUtils'

export interface CampaignCategoryTabProps {
  categoryListUtils: CampaignCategoryListUtils
  modalUtils: UseGenericModalFormEditorUtils
}

export const CampaignCategoryTab: React.FC<CampaignCategoryTabProps> = props => {
  const dispatch = useDispatch()
  const { editorParams, handleExit, handleAfterClose } = props.modalUtils

  useEffect(() => {
    dispatch(campaignCategoryListActions.getCategories())
  }, [dispatch])

  return (
    <>
      <CampaignCategoryList categoryListUtils={props.categoryListUtils} />
      <CampaignCategoryEditor
        params={editorParams}
        handleExit={handleExit}
        afterClose={handleAfterClose}
      />
    </>
  )
}
