import { useEffect, useState, useCallback } from 'react'
import { history } from 'router/router'

export interface GenericModalFormEditorParams {
  visible: boolean
  id?: number
  isNew?: boolean
}

export interface GenericModalFormEditorUtilsProps {
  dataId: string | undefined
  rootRoute: string
  detailRoute?: string
  disableCreate?: boolean
}

export interface GenericModalFormEditorUtils {
  editorParams: GenericModalFormEditorParams
  routeToEditor: (requestDataId?: number) => void
  handleExit: () => void
  handleAfterClose: () => void
}

/**
 * Allows editing rows of a table in a modal window.
 * @param props.dataId The id that corresponds to the table row. It can have the value "new" to
 * indicate that the modal is used to create a new item.
 * @param props.rootRoute The route where the table is shown.
 * @param props.detailRoute When generating the url to the modal window, contains an additional path
 * part.
 * @param props.disableCreate Ignore the "new" value in the `dataId`.
 */
export const useGenericModalFormEditorUtils = (
  props: GenericModalFormEditorUtilsProps
): GenericModalFormEditorUtils => {
  const { dataId, rootRoute, detailRoute, disableCreate } = props

  const [editorParams, setEditorParams] = useState<GenericModalFormEditorParams>({
    visible: false
  })

  /**
   * Redirects to a route where the modal window is visible and it's possible to edit an item or
   * create new one
   */
  const routeToEditor = useCallback(
    (requestDataId?: number): void => {
      history.push(`${rootRoute}${detailRoute ?? ''}/${requestDataId ?? 'new'}`)
    },
    [detailRoute, rootRoute]
  )

  /**
   * Redirects to root, where the table is shown
   */
  const routeToRoot = useCallback((): void => {
    history.push(`${rootRoute}`)
  }, [rootRoute])

  /**
   * Called when the modal window is closed
   */
  const handleExit = useCallback((): void => {
    setEditorParams({ ...editorParams, visible: false })
  }, [editorParams])

  /**
   * This is also called after the modal window is closed, but it's later than `handleExit`.
   */
  const handleAfterClose = useCallback((): void => {
    routeToRoot()
    setEditorParams({ visible: false })
  }, [routeToRoot])

  useEffect(() => {
    if (!dataId) {
      setEditorParams({ visible: false, isNew: false, id: undefined })
    } else {
      setTimeout(() => {
        if (!disableCreate && dataId === 'new') {
          setEditorParams({ visible: true, isNew: true, id: undefined })
        } else if (!isNaN(+dataId)) {
          setEditorParams({ visible: true, isNew: false, id: +dataId })
        } else {
          routeToRoot()
        }
      }, 0)
    }
  }, [dataId, disableCreate, rootRoute, routeToRoot])

  return { editorParams, routeToEditor, handleExit, handleAfterClose }
}
