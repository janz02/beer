import React, { FC, useEffect } from 'react'
import 'grapesjs-preset-newsletter/style/tooltip.css'
import './NewsletterEditor.scss'
import { useNewsletterEditorUtils } from './useNewsletterEditorUtils'
import { NewsLetterEditorHeader, NewsLetterEditorHeaderProps } from './NewsLetterEditorHeader'
import { FeatureState } from 'models/featureState'
import { NewsletterEditorHandlerUtils } from './useNewsletterEditorHandlerUtils'

const EDITOR_SELECTOR = 'pkm-grapesjs'

interface NewsletterEditorProps {
  newsletterEditorHandlerUtils: NewsletterEditorHandlerUtils
}

export const NewsletterEditor: FC<NewsletterEditorProps> = props => {
  const {
    handleGetTemplate,
    handleClearTemplate,
    handleSaveVersion,
    currentTemplateVersionId,
    template,
    templateState
  } = props.newsletterEditorHandlerUtils

  const { getEditorContent } = useNewsletterEditorUtils({
    gjsEditorId: EDITOR_SELECTOR,
    currentTemplateVersionId,
    template
  })

  useEffect(() => {
    handleClearTemplate()
    handleGetTemplate()
    return () => {
      handleClearTemplate()
    }
  }, [handleGetTemplate, handleClearTemplate])

  const headerProps: NewsLetterEditorHeaderProps = {
    handleSaveVersion: () => handleSaveVersion(getEditorContent())
  }

  return (
    <div hidden={templateState !== FeatureState.Success} className="nle">
      <div className="nle__header">
        <NewsLetterEditorHeader {...headerProps} />
      </div>
      <div className="nle__containter">
        <div id={EDITOR_SELECTOR} />
      </div>
    </div>
  )
}
