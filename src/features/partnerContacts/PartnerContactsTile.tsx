import React, { FC, useEffect } from 'react'
import { PartnerContactsList } from './PartnerContactsList'
import { useReusablePartnerContacts } from './useReusablePartnerContacts'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { PartnerContactEditor } from './PartnerContactEditor'

interface PartnerContactsTileProps {
  hidden?: boolean
}
export const PartnerContactsTile: FC<PartnerContactsTileProps> = props => {
  const { hidden } = props
  const dispatch = useDispatch()

  const { route, actions, selector, editedContactId } = useReusablePartnerContacts()
  const { getList, deleteItem, getItem, clearEditor, saveItem } = actions
  const { contacts, listParams, loadingList } = useSelector(selector)

  useEffect(() => {
    dispatch(getList({}))
  }, [dispatch, getList])

  const {
    editorParams,
    routeToEditor,
    handleExit,
    handleAfterClose
  } = useGenericModalFormEditorUtils({
    dataId: editedContactId,
    rootRoute: route.root,
    detailRoute: route.detail,
    disableCreate: true
  })

  const handleGetItem = (id: number): void => {
    dispatch(getItem(id))
  }

  return (
    <>
      {!hidden && (
        <PartnerContactsList
          {...{
            contacts,
            loading: loadingList,
            listParams,
            handleEdit: routeToEditor,
            deleteAction: deleteItem,
            getListAction: getList
          }}
        />
      )}
      <PartnerContactEditor
        {...{
          params: editorParams,
          selector: selector,
          saveAction: saveItem,
          getItem: handleGetItem,
          afterClose: () => {
            handleAfterClose()
            dispatch(clearEditor())
          },
          handleExit
        }}
      />
    </>
  )
}
