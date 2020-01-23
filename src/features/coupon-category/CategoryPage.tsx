import React, { useState, useEffect, useCallback } from 'react'
import './category.scss'
import { CategoryList } from './categoryList/CategoryList'
import { Card } from 'antd'
import { useIsMobile } from 'hooks'
import { CategoryEditor, CategoryEditorParams } from './categoryEditor/CategoryEditor'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import { getCategories } from './categoryList/categoryListSlice'

export const CategoryPage: React.FC = () => {
  const isMobile = useIsMobile()
  const dispatch = useDispatch()

  const [firstLoad, setFirstLoad] = useState(true)
  const [editorParams, setEditorParams] = useState<CategoryEditorParams>({
    visible: false
  })

  const selectedId: number = useSelector(
    (state: RootState) => (state.router.location as any)?.query?.id
  )

  const openEditor = useCallback((id?: number, createNew?: boolean) => {
    if (id || createNew) {
      setEditorParams({ visible: true, isNew: createNew, categoryId: id })
      history.push(`/categories/?id=${id}`)
    }
  }, [])

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    // open the editor on first load, if is specified in the url
    if (selectedId && firstLoad) {
      setFirstLoad(false)
      if (!isNaN(selectedId)) {
        openEditor(selectedId)
      }
    }
  }, [selectedId, openEditor, dispatch, firstLoad])

  return (
    <div className={`category-page ${isMobile ? 'category-page--mobile' : ''}`}>
      <Card className={`list-card ${isMobile ? 'list-card--mobile' : ''}`}>
        <CategoryList onOpenEditor={openEditor} />
      </Card>
      <CategoryEditor
        params={editorParams}
        onExit={() => setEditorParams({ ...editorParams, visible: false })}
        afterClose={() => {
          history.push('/categories')
          setEditorParams({ visible: false })
        }}
      />
    </div>
  )
}
