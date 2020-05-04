import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { useTranslation } from 'react-i18next'
import { GenericModalFormProps } from 'components/popups/GenericModalForm'
import { partnerContactModalActions } from '../partnerContactModalSlice'
import { PartnerContactEditorProps } from './PartnerContactEditor'

interface UsePartnerContactEditorProps {
  editorProps: PartnerContactEditorProps
}
interface UsePartnerContactEditorUtils {
  loading: boolean
  editingSelf: boolean
  editorModalProps: GenericModalFormProps
}
export const usePartnerContactEditor = (
  props: UsePartnerContactEditorProps
): UsePartnerContactEditorUtils => {
  const { editorProps } = props
  const { editorOpen: editOpen, contact, editorState } = useSelector(
    (s: RootState) => s.partnerContactModal
  )
  const { id: selfUserId } = useSelector((s: RootState) => s.auth.userData)

  const editingSelf = contact?.id && selfUserId ? contact.id === selfUserId : false
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const initialValues = useMemo(() => ({ ...contact, isActive: contact?.isActive?.toString() }), [
    contact
  ])

  const handleSaveItem = (values: any): void => {
    dispatch(
      partnerContactModalActions.saveContact(contact?.id!, {
        ...values,
        isActive: values.isActive === 'true'
      })
    )
  }

  const editorModalProps: GenericModalFormProps = {
    loadingContent: editorState === FeatureState.Loading,
    hideFooter: !editorProps.canEdit,
    modalProps: {
      visible: editOpen,
      title: t('partner-contact.editor-title'),
      okText: t('common.save'),
      afterClose: () => dispatch(partnerContactModalActions.clearContactData()),
      onCancel: () => dispatch(partnerContactModalActions.closeEditor())
    },
    formProps: {
      name: 'partner-contact-editor',
      onFinish: handleSaveItem
    },
    initialValues
  }

  return {
    loading: editorState === FeatureState.Loading,
    editingSelf,
    editorModalProps
  }
}
