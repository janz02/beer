import React, { useState, useEffect } from 'react'
import { CategoryList } from './categoryList/CategoryList'
import { CategoryEditor, CategoryEditorParams } from './categoryEditor/CategoryEditor'
import { useDispatch } from 'hooks/react-redux-hooks'
import { history } from 'router/router'
import { getCategories } from './categoryList/categoryListSlice'
import { ResponsivePage } from 'components/responsive/ResponsivePage'
import { useParams } from 'hooks/react-router-dom-hooks'

export const CategoryPage: React.FC = () => {
  const dispatch = useDispatch()

  const { id: selectedId } = useParams()

  const [editorParams, setEditorParams] = useState<CategoryEditorParams>({
    visible: false
  })

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    if (!selectedId) {
      setEditorParams({ visible: false, isNew: false, categoryId: undefined })
    } else {
      setTimeout(() => {
        if (selectedId === 'new') {
          setEditorParams({ visible: true, isNew: true, categoryId: undefined })
        } else if (!isNaN(+selectedId)) {
          setEditorParams({ visible: true, isNew: false, categoryId: +selectedId })
        } else {
          history.push('/categories')
        }
      }, 0)
    }
  }, [selectedId])

  const openEditor = (id?: number): void => {
    history.push(`/categories/${id ?? 'new'}`)
  }

  return (
    <ResponsivePage>
      <CategoryList onOpenEditor={openEditor} />
      <CategoryEditor
        params={editorParams}
        onExit={() => setEditorParams({ ...editorParams, visible: false })}
        afterClose={() => {
          history.push('/categories')
          setEditorParams({ visible: false })
        }}
      />
    </ResponsivePage>
  )
}
