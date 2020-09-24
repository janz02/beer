import React, { useEffect } from 'react'
import { useDispatch } from 'hooks/react-redux-hooks'
import { UseTestGroupCategoryListUtils } from './testGroupCategoryList/useTestGroupCategoryList'
import { UseGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { testGroupCategoryListActions } from './testGroupCategoryList/testGroupCategoryListSlice'
import { TestGroupCategoryList } from './testGroupCategoryList/TestGroupCategoryList'
import { TestGroupCategoryEditor } from './testGroupCategoryEditor/TestGroupCategoryEditor'

export interface CategoryTabProps {
  categoryListUtils: UseTestGroupCategoryListUtils
  modalUtils: UseGenericModalFormEditorUtils
}

export const TestGroupCategoryTab: React.FC<CategoryTabProps> = props => {
  const dispatch = useDispatch()
  const { editorParams, handleExit, handleAfterClose } = props.modalUtils

  useEffect(() => {
    dispatch(testGroupCategoryListActions.getCategories())
  }, [dispatch])

  return (
    <>
      <TestGroupCategoryList categoryListUtils={props.categoryListUtils} />
      <TestGroupCategoryEditor
        params={editorParams}
        handleExit={handleExit}
        afterClose={handleAfterClose}
      />
    </>
  )
}
