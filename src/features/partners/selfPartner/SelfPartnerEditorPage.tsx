import React, { useEffect, useState } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { getMyPartner, updateMyPartner } from './selfPartnerSlice'
import { Partner } from 'models/partner'
import { PartnerEditorFormProps, PartnerEditorForm } from '../components/PartnerEditorForm'
import { useTranslation } from 'react-i18next'

import {
  EditorMode,
  EditorModeOptions,
  EditorModeOptionsProps
} from 'components/buttons/EditorModeOptions'
import { hasPermission } from 'services/jwt-reader'
import { pageViewRoles } from 'services/roleHelpers'

export const SelfPartnerEditorPage: React.FC = () => {
  const dispatch = useDispatch()
  const { partner, loading } = useSelector((state: RootState) => state.selfPartner)
  const { t } = useTranslation()

  const [mode, setMode] = useState(EditorMode.VIEW)

  useEffect(() => {
    dispatch(getMyPartner())
  }, [dispatch])

  const handleSave = (partner: Partner): void => {
    dispatch(updateMyPartner({ ...partner }))
  }

  const optionProps: EditorModeOptionsProps = {
    canEdit: hasPermission(pageViewRoles.contactsEditor),
    mode,
    handleEdit: () => setMode(EditorMode.EDIT),
    handleEscapeEdit: () => setMode(EditorMode.VIEW)
  }

  const props: PartnerEditorFormProps = {
    mode,
    title: t('partner.editor.title'),
    handleSave,
    loading,
    options: <EditorModeOptions {...optionProps} />,
    partner
  }

  return <PartnerEditorForm {...props} />
}
