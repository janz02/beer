import React, { useEffect } from 'react'
import { CategoryList } from './categoryList/CategoryList'
import { CategoryEditor } from './categoryEditor/CategoryEditor'
import { useDispatch } from 'hooks/react-redux-hooks'
import { categoryListActions } from './categoryList/categoryListSlice'
import { UseGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'

export interface CategoryTabProps {
  modalUtils: UseGenericModalFormEditorUtils
}

export const CategoryTab: React.FC<CategoryTabProps> = props => {
  const dispatch = useDispatch()
  const { editorParams, routeToEditor, handleExit, handleAfterClose } = props.modalUtils

  useEffect(() => {
    dispatch(categoryListActions.getCategories())
  }, [dispatch])

  return (
    <>
      <CategoryList onOpenEditor={routeToEditor} />
      <CategoryEditor params={editorParams} handleExit={handleExit} afterClose={handleAfterClose} />
    </>
  )
}
