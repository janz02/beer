import { useEffect, useState, useCallback } from 'react'
import { history } from 'router/router'

export interface GenericModalFormEditorParams {
  visible: boolean
  id?: number
  isNew?: boolean
}

export interface UseGenericModalFormEditorProps {
  dataId: string | undefined
  rootRoute: string
}

export interface UseGenericModalFormEditorUtils {
  editorParams: GenericModalFormEditorParams
  routeToEditor: (requestDataId?: number) => void
  handleExit: () => void
  handleAfterClose: () => void
}

export const useGenericModalFormEditorUtils = (
  props: UseGenericModalFormEditorProps
): UseGenericModalFormEditorUtils => {
  const { dataId, rootRoute } = props

  const [editorParams, setEditorParams] = useState<GenericModalFormEditorParams>({
    visible: false
  })

  const routeToEditor = useCallback(
    (requestDataId?: number): void => {
      history.push(`${rootRoute}/${requestDataId ?? 'new'}`)
    },
    [rootRoute]
  )

  const routeToRoot = useCallback((): void => {
    history.push(`${rootRoute}`)
  }, [rootRoute])

  const handleExit = useCallback((): void => {
    setEditorParams({ ...editorParams, visible: false })
  }, [editorParams])

  const handleAfterClose = useCallback((): void => {
    routeToRoot()
    setEditorParams({ visible: false })
  }, [routeToRoot])

  useEffect(() => {
    if (!dataId) {
      setEditorParams({ visible: false, isNew: false, id: undefined })
    } else {
      setTimeout(() => {
        if (dataId === 'new') {
          setEditorParams({ visible: true, isNew: true, id: undefined })
        } else if (!isNaN(+dataId)) {
          setEditorParams({ visible: true, isNew: false, id: +dataId })
        } else {
          routeToRoot()
        }
      }, 0)
    }
  }, [dataId, rootRoute, routeToRoot])

  return { editorParams, routeToEditor, handleExit, handleAfterClose }
}