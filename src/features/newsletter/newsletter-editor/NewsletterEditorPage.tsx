/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC, useEffect } from 'react'
import { NewsletterEditor } from './NewsletterEditor'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getNewsletterTemplate,
  saveNewsletterTemplateVersion,
  clearNewsletterTemplate,
  switchNewsletterVersion,
  restoreNewsletterTemplateVersion,
  sendNewsletterEmailExample,
  sendNewsletterEmailToSegment,
  getSegmentsForEmail
} from './newsletterEditorSlice'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'

export const NewsletterEditorPage: FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { template, currentTemplateVersionId, segments, loadingEmail } = useSelector(
    (state: RootState) => state.newsletterEditor
  )

  useEffect(() => {
    dispatch(clearNewsletterTemplate())
    if (id && !isNaN(+id)) {
      dispatch(getNewsletterTemplate(+id))
    }
  }, [dispatch, id])

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
          template={template}
          segments={segments}
          currentTemplateVersionId={currentTemplateVersionId}
          handleSaveVersion={onSaveVersion}
          handleRevert={onRevert}
          handleExit={onExit}
          handleSendSample={onSendSample}
          handleSendSegment={onSendSegment}
          handleGetSegments={onGetSegments}
          handleVersionPreviewSwitch={(id: number) => dispatch(switchNewsletterVersion(+id))}
        />
      </ErrorBoundary>
    </>
  )
}
