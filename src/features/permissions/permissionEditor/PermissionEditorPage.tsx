import React, { useEffect, useState } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { history } from 'router/router'
import {
  getPermission,
  savePermission,
  resetPermissionEditor,
  deletePermission,
  getAdGroups,
  getCampaignUsers,
  getFunctionPermissions
} from './permissionEditorSlice'
import { useParams } from 'react-router-dom'
import { CampaignPermission } from 'models/campaignPermission'
import { Roles } from 'api/swagger/coupon'
import { GenericPopup, PopupState } from 'components/popups/GenericPopup'

import {
  EditorModeOptions,
  EditorModeOptionsProps,
  EditorMode
} from 'components/buttons/EditorModeOptions'

import { PermissionEditorForm } from './components/PermissionEditorForm'

export const permissionsEditorRoles = [Roles.Administrator, Roles.CampaignManager]

export const PermissionEditorPage: React.FC = () => {
  const { t } = useTranslation()
  const { permissionId: id } = useParams()
  const dispatch = useDispatch()
  const {
    permission,
    loading,
    campaignUsers,
    campaignAdGroups,
    campaignFunctionPermissions
  } = useSelector((state: RootState) => state.permissionEditor)

  const [mode, setMode] = useState(id ? EditorMode.VIEW : EditorMode.NEW)
  const [permissionToDelete, setPermissionToDelete] = useState<PopupState<CampaignPermission>>()

  useEffect(() => {
    if (id) {
      dispatch(getPermission(+id))
    }
    dispatch(getFunctionPermissions(id))
    dispatch(getAdGroups(id))
    dispatch(getCampaignUsers(id))

    return () => {
      dispatch(resetPermissionEditor())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (id) {
      setMode(EditorMode.VIEW)
    }
  }, [id, permission])

  const handleSave = (values: CampaignPermission): void => {
    dispatch(savePermission(values))
  }

  const optionProps: EditorModeOptionsProps = {
    mode,
    editPermission: permissionsEditorRoles,
    handleDelete: () => {
      setPermissionToDelete({
        data: permission,
        popupVisible: true
      })
    },
    handleEdit: () => setMode(EditorMode.EDIT),
    handleEscapeEdit: () => setMode(EditorMode.VIEW)
  }

  const options = (
    <>
      <EditorModeOptions {...optionProps} />
    </>
  )

  const title = (mode: EditorMode): string => {
    switch (mode) {
      case EditorMode.EDIT:
        return t('permission.editor.title.edit')
      case EditorMode.NEW:
        return t('permission.editor.title.new')
      case EditorMode.VIEW:
      default:
        return t('permission.editor.title.view')
    }
  }

  return (
    <>
      <PermissionEditorForm
        options={options}
        mode={mode}
        handleSave={handleSave}
        loading={loading}
        permission={{ ...permission }}
        campaignUsers={campaignUsers}
        campaignAdGroups={campaignAdGroups}
        campaignFunctionPermissions={campaignFunctionPermissions}
        title={title(mode)}
        handleBack={() => history.push('/permissions')}
      />
      <GenericPopup
        type="delete"
        id={permissionToDelete?.data?.id!}
        visible={!!permissionToDelete?.popupVisible}
        onCancel={() => setPermissionToDelete({ ...permissionToDelete, popupVisible: false })}
        onOkAction={deletePermission?.(permissionToDelete?.data?.id!)}
        afterClose={() => setPermissionToDelete(null)}
      >
        <p>{permissionToDelete?.data?.name}</p>
      </GenericPopup>
    </>
  )
}
