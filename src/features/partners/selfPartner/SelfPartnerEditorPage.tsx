import React, { useEffect } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { getMyPartner, updateMyPartner } from './selfPartnerSlice'
import { Partner } from 'models/partner'
import { PartnerEditorFormProps, PartnerEditorForm } from '../components/PartnerEditorForm'
import { useTranslation } from 'react-i18next'

export const SelfPartnerEditorPage: React.FC = () => {
  const dispatch = useDispatch()
  const { partner, loading } = useSelector((state: RootState) => state.selfPartner)
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(getMyPartner())
  }, [dispatch])

  const handleSave = (partner: Partner): void => {
    dispatch(updateMyPartner({ ...partner }))
  }

  const props: PartnerEditorFormProps = {
    title: t('partner.editor-title'),
    handleSave,
    loading,
    partner
  }

  return <PartnerEditorForm {...props} />
}
