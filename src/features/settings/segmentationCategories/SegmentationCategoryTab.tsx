import React, { useEffect } from 'react'
import { UseGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { useSelector, useDispatch } from '../../../hooks/react-redux-hooks'
import { UseSegmentationCategoryListUtils } from './categoryList/useSegmentationCategoryList'
import { segmentationCategoryListActions } from './categoryList/segmentationCategoryListSlice'
import { SegmentationCategoryList } from './categoryList/SegmentationCategoryList'
import { SegmentationCategoryEditor } from './categoryEditor/SegmentationCategoryEditor'

export interface SegmentationCategoryTabProps {
  categoryListUtils: UseSegmentationCategoryListUtils
  modalUtils: UseGenericModalFormEditorUtils
}

export const SegmentationCategoryTab: React.FC<SegmentationCategoryTabProps> = props => {
  const dispatch = useDispatch()
  const { editorParams, handleExit, handleAfterClose } = props.modalUtils
  useEffect(() => {
    dispatch(segmentationCategoryListActions.getCategories())
  }, [dispatch])
  return (
    <>
      <SegmentationCategoryList categoryListUtils={props.categoryListUtils} />
      <SegmentationCategoryEditor
        params={editorParams}
        handleExit={handleExit}
        afterClose={handleAfterClose}
      />
    </>
  )
}
