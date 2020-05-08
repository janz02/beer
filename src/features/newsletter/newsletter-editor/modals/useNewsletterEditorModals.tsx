import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { GenericModalFormProps } from 'components/popups/GenericModalForm'
import { useTranslation } from 'react-i18next'
import { newsletterEditorActions, NewsletterTemplateContentState } from '../newsletterEditorSlice'
import { Segment } from 'models/segment'
import { GenericPopupProps } from 'components/popups/GenericPopup'

interface UseNewsletterEditorModalsUtils {
  templateContentState: NewsletterTemplateContentState
  openSegmentEmail: boolean
  segments: Segment[]
  segmentEmailModalFormProps: GenericModalFormProps
  testEmailModalFormProps: GenericModalFormProps
  revertPopupProps: GenericPopupProps
  discardPopupProps: GenericPopupProps
  handleGetSegmnentsForEmail: () => void
}
export const useNewsletterEditorModals = (): UseNewsletterEditorModalsUtils => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const {
    templateContentState,
    emailState,
    openSegmentEmail,
    openTestEmail,
    segments,
    openRevert,
    openDiscard,
    targetTemplateVersionId
  } = useSelector((s: RootState) => s.newsletterEditor)

  const emailLoading = emailState === FeatureState.Loading

  const handleGetSegmnentsForEmail = useCallback((): void => {
    dispatch(newsletterEditorActions.getSegmentsForEmail())
  }, [dispatch])

  const handleSendSegmentEmail = (values: any): void => {
    dispatch(newsletterEditorActions.sendNewsletterEmailToSegment(+values.segment, values.subject))
  }

  const handleSendTestEmail = (values: any): void => {
    dispatch(newsletterEditorActions.sendNewsletterEmailExample(values.email, values.subject))
  }

  const handleRevert = (): void => {
    dispatch(newsletterEditorActions.restoreNewsletterTemplateVersion())
  }
  const handleConfirmDiscard = (): void => {
    targetTemplateVersionId &&
      dispatch(newsletterEditorActions.switchNewsletterVersion(targetTemplateVersionId))
  }

  const segmentEmailModalFormProps: GenericModalFormProps = {
    loadingAction: emailLoading,
    modalProps: {
      visible: openSegmentEmail,
      title: t('newsletter.popup.title-send-segment'),
      okText: t('common.send'),
      okButtonProps: {
        disabled: emailLoading
      },
      onCancel: () => dispatch(newsletterEditorActions.closeSegmentEmailModal())
    },
    formProps: {
      onFinish: handleSendSegmentEmail
    }
  }

  const testEmailModalFormProps: GenericModalFormProps = {
    loadingAction: emailLoading,
    modalProps: {
      visible: openTestEmail,
      title: t('newsletter.popup.title-send-sample'),
      okText: t('common.send'),
      okButtonProps: {
        disabled: emailLoading
      },
      onCancel: () => dispatch(newsletterEditorActions.closeTestEmailModal())
    },
    formProps: {
      onFinish: handleSendTestEmail
    }
  }

  const revertPopupProps: GenericPopupProps = {
    type: 'restore',
    visible: openRevert,
    onOk: () => {
      handleRevert()
    },
    onCancel: () => dispatch(newsletterEditorActions.closeRevertModal())
  }

  const discardPopupProps: GenericPopupProps = {
    type: 'discard',
    visible: openDiscard,
    onOk: () => {
      handleConfirmDiscard()
      dispatch(newsletterEditorActions.closeDiscardModal())
    },
    onCancel: () => dispatch(newsletterEditorActions.closeDiscardModal())
  }

  return {
    templateContentState,
    openSegmentEmail,
    segmentEmailModalFormProps,
    testEmailModalFormProps,
    revertPopupProps,
    discardPopupProps,
    segments,
    handleGetSegmnentsForEmail
  }
}
