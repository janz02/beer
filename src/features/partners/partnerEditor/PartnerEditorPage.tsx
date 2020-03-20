import React, { useEffect, useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'

import { useTranslation } from 'react-i18next'
import { PartnerEditorForm } from '../components/PartnerEditorForm'
import { history } from 'router/router'
import {
  getPartner,
  savePartner,
  resetPartnerEditor,
  getPartnerSites,
  getPartnerContacts
} from './partnerEditorSlice'
import { useParams } from 'react-router-dom'
import { Partner } from 'models/partner'
import { EditButton } from 'components/buttons/EditButton'
import { EscapeButton } from 'components/buttons/EscapeButton'
import { Roles } from 'api/swagger/models'
import { hasPermission } from 'services/jwt-reader'

export const partnersEditorRoles = [
  Roles.Administrator,
  Roles.CampaignManager,
  Roles.PartnerManager
]

export enum PartnerEditorMode {
  NEW = 'new',
  EDIT = 'edit',
  VIEW = 'view'
}

export const PartnerEditorPage: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { partner, loading } = useSelector((state: RootState) => state.partnerEditor)

  const [mode, setMode] = useState(id ? PartnerEditorMode.VIEW : PartnerEditorMode.NEW)

  useEffect(() => {
    const fetch = async (): Promise<any> => {
      if (!id) return
      await dispatch(getPartner(+id))
      dispatch(getPartnerSites())
      dispatch(getPartnerContacts())
    }
    fetch()

    return () => {
      dispatch(resetPartnerEditor())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (id) {
      setMode(PartnerEditorMode.VIEW)
    }
  }, [id, partner])

  const handleSave = (values: Partner): void => {
    dispatch(savePartner(values))
  }

  const options = useMemo((): JSX.Element | undefined => {
    switch (mode) {
      case PartnerEditorMode.VIEW:
        return hasPermission(partnersEditorRoles) ? (
          <EditButton onClick={() => setMode(PartnerEditorMode.EDIT)} />
        ) : (
          undefined
        )
      case PartnerEditorMode.EDIT:
        return (
          <EscapeButton
            onClick={() => setMode(PartnerEditorMode.VIEW)}
            label={t('common.escape-editor')}
          />
        )
      default:
        return undefined
    }
  }, [mode, t])

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
    </>
  )
}
