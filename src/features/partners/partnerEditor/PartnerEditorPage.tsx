import React, { useEffect } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'

import { useTranslation } from 'react-i18next'
import { PartnerEditorForm } from '../components/PartnerEditorForm'
import { history } from 'router/router'
import { getPartner } from './partnerEditorSlice'
import { useParams } from 'react-router-dom'

export const PartnerEditorPage: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { partner, loading } = useSelector((state: RootState) => state.partnerEditor)

  useEffect(() => {
    id && dispatch(getPartner(+id))
  }, [dispatch, id])

  return (
    <>
      <PartnerEditorForm
        handleSave={() => {}}
        loading={loading}
        partner={partner}
        title={t('partner.editor.title')}
        handleBack={() => history.push('/partners')}
      />
    </>
  )
}
