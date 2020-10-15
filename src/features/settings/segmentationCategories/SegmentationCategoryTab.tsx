import React, { useEffect } from 'react'
import { UseGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { useDispatch } from '../../../hooks/react-redux-hooks'
import { SegmentationCategoryListUtils } from './categoryList/useSegmentationCategoryListUtils'
import { segmentationCategoryListActions } from './categoryList/segmentationCategoryListSlice'
import { SegmentationCategoryList } from './categoryList/SegmentationCategoryList'
import { SegmentationCategoryEditor } from './categoryEditor/SegmentationCategoryEditor'

export interface SegmentationCategoryTabProps {
  categoryListUtils: SegmentationCategoryListUtils
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
