import React, { useEffect, useState } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { PartnerEditorForm } from '../components/PartnerEditorForm'
import { history } from 'router/router'
import {
  getPartner,
  savePartner,
  resetPartnerEditor,
  deletePartner,
  changeRegStatePartner
} from './partnerEditorSlice'
import { useParams } from 'react-router-dom'
import { Partner } from 'models/partner'
import { Roles, PartnerRegistrationState } from 'api/swagger/models'
import { GenericPopup, PopupState } from 'components/popups/GenericPopup'
import { PartnerStateButton } from './PartnerStateButton'

import {
  EditorModeOptions,
  EditorModeOptionsProps,
  EditorMode
} from 'components/buttons/EditorModeOptions'
import {
  PartnerContactTile,
  PartnerContactConfig
} from 'features/partnerContact/PartnerContactTile'
import { hasPermission } from 'services/jwt-reader'
import { UserType } from 'models/user'
import { SiteFeatureConfig } from 'features/sites/siteList/siteListSlice'
import { SiteList } from 'features/sites/siteList/SiteList'
import { Button } from 'antd'

export const partnersEditorRoles = [
  Roles.Administrator,
  Roles.CampaignManager,
  Roles.PartnerManager
]

export const PartnerEditorPage: React.FC = () => {
  const { t } = useTranslation()
  const { partnerId: id } = useParams()
  const dispatch = useDispatch()
  const { partner, loading, loadingRegState } = useSelector(
    (state: RootState) => state.partnerEditor
  )

  const [mode, setMode] = useState(id ? EditorMode.VIEW : EditorMode.NEW)
  const [partnerToDelete, setPartnerToDelete] = useState<PopupState<Partner>>()

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

  const partnerContactConfig: PartnerContactConfig = {
    listConstraint: { partnerId: id },
    shrinks: true,
    userType: +id! === 1 ? UserType.NKM : UserType.PARTNER,
    canEdit: hasPermission([Roles.Administrator, Roles.CampaignManager, Roles.PartnerManager])
  }

  const sitesConfig: SiteFeatureConfig = {
    shrinks: true,
    routeRoot: `/partners/${id}/site`,
    routeExit: `/partners/${id}`
  }

  const displayAcceptButton =
    !partner?.majorPartner &&
    (partner?.partnerRegistrationState === PartnerRegistrationState.Pending ||
      partner?.partnerRegistrationState === PartnerRegistrationState.Rejected)
  const displayRejectButton =
    !partner?.majorPartner && partner?.partnerRegistrationState === PartnerRegistrationState.Pending

  const options = (
    <>
      {displayAcceptButton && (
        <Button
          size="large"
          onClick={() =>
            partner?.id &&
            dispatch(changeRegStatePartner(partner?.id, PartnerRegistrationState.Approved))
          }
          loading={loadingRegState}
        >
          {t('partner.editor.accept')}
        </Button>
      )}

      {displayRejectButton && (
        <Button
          size="large"
          onClick={() =>
            partner?.id &&
            dispatch(changeRegStatePartner(partner?.id, PartnerRegistrationState.Rejected))
          }
          loading={loadingRegState}
        >
          {t('partner.editor.reject')}
        </Button>
      )}

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
      {mode !== EditorMode.NEW && (
        <>
          <SiteList config={sitesConfig} />
          <PartnerContactTile {...partnerContactConfig} />
        </>
      )}
    </>
  )
}
