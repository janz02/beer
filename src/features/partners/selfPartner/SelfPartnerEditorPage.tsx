import React, { useEffect, useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { getMyPartner, updateMyPartner } from './selfPartnerSlice'
import { Partner } from 'models/partner'
import { PartnerEditorFormProps, PartnerEditorForm } from '../components/PartnerEditorForm'
import { useTranslation } from 'react-i18next'
import { PartnerEditorMode } from '../partnerEditor/PartnerEditorPage'
import { EditButton } from 'components/buttons/EditButton'
import { EscapeButton } from 'components/buttons/EscapeButton'

export const SelfPartnerEditorPage: React.FC = () => {
  const dispatch = useDispatch()
  const { partner, loading } = useSelector((state: RootState) => state.selfPartner)
  const { t } = useTranslation()

  const [mode, setMode] = useState(PartnerEditorMode.VIEW)

  useEffect(() => {
    dispatch(getMyPartner())
  }, [dispatch])

  const handleSave = (partner: Partner): void => {
    dispatch(updateMyPartner({ ...partner }))
  }

  const options = useMemo((): JSX.Element | undefined => {
    switch (mode) {
      case PartnerEditorMode.VIEW:
        return <EditButton onClick={() => setMode(PartnerEditorMode.EDIT)} />
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

  const props: PartnerEditorFormProps = {
    mode,
    title: t('partner.editor-title'),
    handleSave,
    loading,
    options,
    partner
  }

  return <PartnerEditorForm {...props} />
}
