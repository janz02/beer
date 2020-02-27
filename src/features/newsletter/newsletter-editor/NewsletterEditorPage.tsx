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
  restoreNewsletterTemplateVersion
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

  return (
    <>
      <ErrorBoundary>
        <NewsletterEditor
          template={template}
          currentTemplateVersionId={currentTemplateVersionId}
          handleSaveVersion={onSaveVersion}
          handleRevert={onRevert}
          handleExit={onExit}
          handleVersionPreviewSwitch={(id: number) => dispatch(switchNewsletterVersion(+id))}
        />
      </ErrorBoundary>
    </>
  )
}
