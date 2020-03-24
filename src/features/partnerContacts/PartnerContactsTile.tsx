import React, { FC, useEffect } from 'react'
import { PartnerContactsList } from './PartnerContactsList'
import { useReusablePartnerContacts } from './useReusablePartnerContacts'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { PartnerContactEditor } from './PartnerContactEditor'

interface PartnerContactsTileProps {
  hidden?: boolean
}
export const PartnerContactsTile: FC<PartnerContactsTileProps> = props => {
  const { hidden } = props
  const dispatch = useDispatch()
  const { contactId } = useParams()

  const { route, actions, selector } = useReusablePartnerContacts()
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
    dataId: contactId,
    rootRoute: route.root,
    detailRoute: '/contact'
  })

  return (
    <>
      {!hidden && (
        <PartnerContactsList
          {...{
            contacts,
            loading: loadingList,
            listParams,
            handleEdit: (id: number) => routeToEditor(id),
            handleCreate: () => routeToEditor(),
            deleteAction: deleteItem,
            getListAction: getList
          }}
        />
      )}
      <PartnerContactEditor
        {...{
          params: editorParams,
          selector,
          saveAction: saveItem,
          getItem: (id: number) => {
            dispatch(getItem(id))
          },
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
