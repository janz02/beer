import React, { FC, useEffect, useCallback } from 'react'
import { NewsletterEditor } from './NewsletterEditor'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import {
  getNewsletterTemplate,
  saveNewsletterTemplateVersion,
  clearNewsletterTemplate,
  restoreNewsletterTemplateVersion,
  sendNewsletterEmailExample,
  sendNewsletterEmailToSegment,
  getSegmentsForEmail
} from './newsletterEditorSlice'

export const NewsletterEditorPage: FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { template, currentTemplateVersionId, segments, loadingEmail, templateState } = useSelector(
    (state: RootState) => state.newsletterEditor
  )

  const handleGetTemplate = useCallback((): void => {
    if (id && !isNaN(+id)) {
      dispatch(getNewsletterTemplate(+id))
    }
  }, [id, dispatch])

  useEffect(() => {
    dispatch(clearNewsletterTemplate())
    handleGetTemplate()
    return () => {
      dispatch(clearNewsletterTemplate())
    }
  }, [dispatch, handleGetTemplate])

  const onRevert = (): void => {
    dispatch(restoreNewsletterTemplateVersion())
  }

  const onExit = (): void => {
    history.push('/newsletter')
  }

  const onSaveVersion = async (template: string): Promise<void> => {
    await dispatch(saveNewsletterTemplateVersion(template))
  }

  const onSendSample: any = async (email: string, subject: string): Promise<boolean> => {
    const sent: any = await dispatch(sendNewsletterEmailExample(email, subject))
    return sent as boolean
  }

  const onSendSegment = async (segmentId: number, subject: string): Promise<boolean> => {
    const sent: any = await dispatch(sendNewsletterEmailToSegment(segmentId, subject))
    return sent as boolean
  }

  const onGetSegments = async (): Promise<void> => {
    await dispatch(getSegmentsForEmail())
  }

  return (
    <>
      <ErrorBoundary>
        <NewsletterEditor
          loadingEmail={loadingEmail}
          templateState={templateState}
          template={template}
          segments={segments}
          currentTemplateVersionId={currentTemplateVersionId}
          handleSaveVersion={onSaveVersion}
          handleTemplateReload={handleGetTemplate}
          handleRevert={onRevert}
          handleExit={onExit}
          handleSendSample={onSendSample}
          handleSendSegment={onSendSegment}
          handleGetSegments={onGetSegments}
          handleVersionPreviewSwitch={handleGetTemplate}
        />
      </ErrorBoundary>
    </>
  )
}
