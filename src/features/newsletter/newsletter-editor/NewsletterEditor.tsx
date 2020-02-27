import React, { FC, useState } from 'react'
import 'grapesjs-preset-newsletter/style/tooltip.css'
import './NewsletterEditor.scss'
import { useTranslation } from 'react-i18next'
import { GenericPopup } from 'components/popups/GenericPopup'
import { NewsletterData } from 'models/newsletter'
import { Spin } from 'antd'
import { useNewsletterEditor } from './useNewsletterEditor'
import { NewsLetterEditorHeader, NewsLetterEditorHeaderProps } from './NewsLetterEditorHeader'
const EDITOR_SELECTOR = 'pkm-grapesjs'

export interface NewsletterEditorProps {
  template: NewsletterData | null | undefined
  currentTemplateVersionId?: number
  handleSaveVersion: (template: string) => void
  handleRevert: () => void
  handleVersionPreviewSwitch: (id: number) => void
  handleExit: () => void
}

export const NewsletterEditor: FC<NewsletterEditorProps> = props => {
  const {
    handleVersionPreviewSwitch,
    currentTemplateVersionId,
    template,
    handleRevert,
    handleSaveVersion,
    handleExit
  } = props

  const { t } = useTranslation()

  const [visibleDiscardPopup, setVisibleDiscardPopup] = useState(false)
  const [visibleRevertPopup, setVisibleRevertPopup] = useState(false)
  const [loading, setLoading] = useState(true)

  const {
    getEditorContent,
    isLatestTemplate,
    isNewTemplate,
    isTemplateModified
  } = useNewsletterEditor({
    gjsEditorId: EDITOR_SELECTOR,
    currentTemplateVersionId,
    template,
    onEditorLoaded: () => setLoading(false)
  })

  const headerProps: NewsLetterEditorHeaderProps = {
    isLatestTemplate,
    isNewTemplate,
    isTemplateModified,
    template,
    currentTemplateVersionId,
    handleVersionPreviewSwitch,
    handleRevert: () => setVisibleRevertPopup(true),
    handleSaveVersion: () => handleSaveVersion(getEditorContent()),
    handleExit: () => {
      if (isTemplateModified) {
        setVisibleDiscardPopup(true)
      } else if (handleExit) {
        handleExit()
      }
    }
  }

  return (
    <>
      <Spin className="nle-spinner" spinning={loading} size="large" />
      <div hidden={loading} className="nle">
        <NewsLetterEditorHeader className="nle__header" {...headerProps} />

        <div className="nle__containter">
          <div id={EDITOR_SELECTOR} />
        </div>

        <GenericPopup
          type="discard"
          visible={visibleDiscardPopup}
          onOk={handleExit}
          onCancel={() => setVisibleDiscardPopup(false)}
        >
          {t('newsletter.popup.discard-msg')}
        </GenericPopup>
        <GenericPopup
          type="restore"
          visible={visibleRevertPopup}
          onOk={() => {
            handleRevert()
            setVisibleRevertPopup(false)
          }}
          onCancel={() => setVisibleRevertPopup(false)}
        >
          {t('newsletter.popup.restore-msg')}
        </GenericPopup>
      </div>
    </>
  )
}
