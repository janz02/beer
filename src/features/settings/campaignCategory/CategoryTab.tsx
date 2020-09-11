import React, { useEffect } from 'react'
import { CategoryList } from './categoryList/CategoryList'
import { CategoryEditor } from './categoryEditor/CategoryEditor'
import { useDispatch } from 'hooks/react-redux-hooks'
import { categoryListActions } from './categoryList/categoryListSlice'
import { UseGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { UseCategoryListUtils } from './categoryList/useCategoryList'

export interface CategoryTabProps {
  categoryListUtils: UseCategoryListUtils
  modalUtils: UseGenericModalFormEditorUtils
}

export const CategoryTab: React.FC<CategoryTabProps> = props => {
  const dispatch = useDispatch()
  const { editorParams, handleExit, handleAfterClose } = props.modalUtils

  useEffect(() => {
    dispatch(categoryListActions.getCategories())
  }, [dispatch])

  return (
    <>
      <CategoryList categoryListUtils={props.categoryListUtils} />
      <CategoryEditor params={editorParams} handleExit={handleExit} afterClose={handleAfterClose} />
    </>
  )
}
