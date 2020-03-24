import React, { useEffect, useState } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'

import { useTranslation } from 'react-i18next'
import { PartnerEditorForm } from '../components/PartnerEditorForm'
import { history } from 'router/router'
import { getPartner, savePartner, resetPartnerEditor, deletePartner } from './partnerEditorSlice'
import { useParams } from 'react-router-dom'
import { Partner } from 'models/partner'
import { Roles } from 'api/swagger/models'
import { GenericPopup, DeletePopupState } from 'components/popups/GenericPopup'
import { SitesListTile } from 'features/sites/siteList/SitesListTile'
import { PartnerStateButton } from './PartnerStateButton'
import {
  EditorModeOptions,
  EditorModeOptionsProps,
  EditorMode
} from 'components/buttons/EditorModeOptions'

export const partnersEditorRoles = [
  Roles.Administrator,
  Roles.CampaignManager,
  Roles.PartnerManager
]

export const PartnerEditorPage: React.FC = () => {
  const { t } = useTranslation()
  const { partnerId: id } = useParams()
  const dispatch = useDispatch()
  const { partner, loading } = useSelector((state: RootState) => state.partnerEditor)

  const [mode, setMode] = useState(id ? EditorMode.VIEW : EditorMode.NEW)
  const [partnerToDelete, setPartnerToDelete] = useState<DeletePopupState<Partner>>()

  useEffect(() => {
    id && dispatch(getPartner(+id))

    return () => {
      dispatch(resetPartnerEditor())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (id) {
      setMode(EditorMode.VIEW)
    }
  }, [id, partner])

  const handleSave = (values: Partner): void => {
    dispatch(savePartner(values))
  }

  const optionProps: EditorModeOptionsProps = {
    mode,
    editPermission: partnersEditorRoles,
    handleDelete: () => {
      setPartnerToDelete({
        data: partner,
        popupVisible: true
      })
    },
    handleEdit: () => setMode(EditorMode.EDIT),
    handleEscapeEdit: () => setMode(EditorMode.VIEW)
  }

  const options = (
    <>
      <PartnerStateButton />
      <EditorModeOptions {...optionProps} />
    </>
  )

  return (
    <>
      <PartnerEditorForm
        options={options}
        mode={mode}
        handleSave={handleSave}
        loading={loading}
        partner={{ ...partner }}
        title={t('partner.editor.title')}
        handleBack={() => history.push('/partners')}
      />
      <GenericPopup
        type="delete"
        id={partnerToDelete?.data?.id!}
        visible={!!partnerToDelete?.popupVisible}
        onCancel={() => setPartnerToDelete({ ...partnerToDelete, popupVisible: false })}
        onOkAction={deletePartner?.(partnerToDelete?.data?.id!)}
        afterClose={() => setPartnerToDelete(null)}
      >
        <p>{partnerToDelete?.data?.name}</p>
      </GenericPopup>
      {mode !== EditorMode.NEW && <SitesListTile hidden={mode !== EditorMode.VIEW} />}
    </>
  )
}
