import React, { useState, useEffect, useCallback } from 'react'
import { CategoryList } from './categoryList/CategoryList'
import { CategoryEditor, CategoryEditorParams } from './categoryEditor/CategoryEditor'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import { getCategories } from './categoryList/categoryListSlice'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsivePage } from 'components/responsive/ResponsivePage'

export const CategoryPage: React.FC = () => {
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
    <ResponsivePage>
      <ResponsiveCard>
        <CategoryList onOpenEditor={openEditor} />
      </ResponsiveCard>
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
