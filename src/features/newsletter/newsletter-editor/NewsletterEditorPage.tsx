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
  sendNewsletterEmailExample
} from './newsletterEditorSlice'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'

export const NewsletterEditorPage: FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { template, currentTemplateVersionId } = useSelector(
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
    dispatch(clearNewsletterTemplate())
  }

  const onSaveVersion = (template: string): void => {
    dispatch(saveNewsletterTemplateVersion(template))
  }

  const onSendSample: any = async (email: string) => {
    const sent = await dispatch(sendNewsletterEmailExample(email))
    return sent
  }

  return (
    <>
      <ErrorBoundary>
        <NewsletterEditor
          template={template}
          currentTemplateVersionId={currentTemplateVersionId}
          handleSaveVersion={onSaveVersion}
          handleRevert={onRevert}
          handleExit={onExit}
          handleSendSample={onSendSample}
          handleVersionPreviewSwitch={(id: number) => dispatch(switchNewsletterVersion(+id))}
        />
      </ErrorBoundary>
    </>
  )
}
