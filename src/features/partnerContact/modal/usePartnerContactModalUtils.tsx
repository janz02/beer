import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { useTranslation } from 'react-i18next'
import { GenericModalFormProps } from 'components/popups/GenericModalForm'
import { partnerContactModalActions } from './partnerContactModalSlice'
import { PartnerContactConfig } from '../PartnerContactTile'

interface PartnerContactModalUtilsProps {
  config: PartnerContactConfig
}

export interface PartnerContactModalUtils {
  editingSelf: boolean
  editorModalProps: GenericModalFormProps
  inviterModalProps: GenericModalFormProps
}

export const usePartnerContactModalUtils = (
  props: PartnerContactModalUtilsProps
): PartnerContactModalUtils => {
  const { canEdit } = props.config
  const { editorOpen, contact, editorState, inviterOpen, inviterState } = useSelector(
    (s: RootState) => s.partnerContactModal
  )
  const { id: selfUserId } = useSelector((s: RootState) => s.auth.userData)

  const editingSelf = contact?.id && selfUserId ? contact.id === selfUserId : false
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const initialValues = useMemo(() => ({ ...contact, isActive: contact?.isActive?.toString() }), [
    contact
  ])

  const handleSaveContanct = (values: any): void => {
    dispatch(
      partnerContactModalActions.saveContact(contact?.id!, {
        ...values,
        isActive: values.isActive === 'true'
      })
    )
  }

  const handleSendInvitation = (values: any): void => {
    dispatch(partnerContactModalActions.sendInvitation(values.email))
  }

  const editorModalProps: GenericModalFormProps = {
    loadingContent: editorState === FeatureState.Loading,
    hideFooter: !canEdit,
    modalProps: {
      visible: editorOpen,
      title: t('partner-contact.editor-title'),
      okText: t('common.save'),
      afterClose: () => dispatch(partnerContactModalActions.clearContactData()),
      onCancel: () => dispatch(partnerContactModalActions.closeEditor())
    },
    formProps: {
      name: 'partner-contact-editor',
      onFinish: handleSaveContanct
    },
    initialValues
  }

  const inviterModalProps: GenericModalFormProps = {
    loadingContent: inviterState === FeatureState.Loading,
    hideFooter: !canEdit,
    modalProps: {
      visible: inviterOpen,
      title: t('partner-contact.send-invitation'),
      okText: t('common.invite'),
      onCancel: () => dispatch(partnerContactModalActions.closeInviter())
    },
    formProps: {
      name: 'partner-contact-inviter',
      onFinish: handleSendInvitation
    },
    initialValues
  }

  return {
    editingSelf,
    editorModalProps,
    inviterModalProps
  }
}
