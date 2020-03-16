import React, { useEffect } from 'react'
import { CategoryList } from './categoryList/CategoryList'
import { CategoryEditor } from './categoryEditor/CategoryEditor'
import { useDispatch } from 'hooks/react-redux-hooks'
import { getCategories } from './categoryList/categoryListSlice'
import { ResponsivePage } from 'components/responsive/ResponsivePage'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'

export const CategoryPage: React.FC = () => {
  const dispatch = useDispatch()

  const { id } = useParams()

  const {
    editorParams,
    routeToEditor,
    handleExit,
    handleAfterClose
  } = useGenericModalFormEditorUtils({
    dataId: id,
    rootRoute: '/categories'
  })

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <ResponsivePage>
      <CategoryList onOpenEditor={routeToEditor} />
      <CategoryEditor params={editorParams} handleExit={handleExit} afterClose={handleAfterClose} />
    </ResponsivePage>
  )
}
