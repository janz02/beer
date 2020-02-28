import React, { FC, useState } from 'react'
import 'grapesjs-preset-newsletter/style/tooltip.css'
import './NewsletterEditor.scss'
import { useTranslation } from 'react-i18next'
import { GenericPopup } from 'components/popups/GenericPopup'
import { Newsletter } from 'models/newsletter'
import { Spin, Form, Input } from 'antd'
import { useNewsletterEditor } from './useNewsletterEditor'
import { NewsLetterEditorHeader, NewsLetterEditorHeaderProps } from './NewsLetterEditorHeader'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { useCommonFormRules } from 'hooks'
const EDITOR_SELECTOR = 'pkm-grapesjs'

export interface NewsletterEditorProps {
  template: Newsletter | null | undefined
  currentTemplateVersionId?: number
  handleSaveVersion: (template: string) => void
  handleRevert: () => void
  handleVersionPreviewSwitch: (id: number) => void
  handleSendSample: (email: string) => void
  handleExit: () => void
}

export const NewsletterEditor: FC<NewsletterEditorProps> = props => {
  const {
    handleVersionPreviewSwitch,
    currentTemplateVersionId,
    template,
    handleRevert,
    handleSaveVersion,
    handleExit,
    handleSendSample
  } = props

  const { t } = useTranslation()
  const rule = useCommonFormRules()

  const [visibleDiscardPopup, setVisibleDiscardPopup] = useState(false)
  const [visibleRevertPopup, setVisibleRevertPopup] = useState(false)
  const [sendPopup, setSendPopup] = useState<{
    visible?: boolean
    sending?: boolean
  } | null>()
  const [switchPopup, setSwitchPopup] = useState<{
    visible: boolean
    versionId: number
  } | null>()

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
    handleVersionPreviewSwitch: (id: number) => {
      if (isTemplateModified) {
        setSwitchPopup({ visible: true, versionId: id })
      } else {
        handleVersionPreviewSwitch(id)
      }
    },
    handleRevert: () => setVisibleRevertPopup(true),
    handleSaveVersion: () => handleSaveVersion(getEditorContent()),
    handleExit: () => {
      if (isTemplateModified) {
        setVisibleDiscardPopup(true)
      } else {
        handleExit()
      }
    },
    handleSendSample: () => setSendPopup({ ...sendPopup, visible: true })
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
          type="discard"
          visible={switchPopup?.visible}
          onOk={() => {
            switchPopup?.versionId && handleVersionPreviewSwitch(switchPopup.versionId)
            setSwitchPopup(null)
          }}
          onCancel={() => setSwitchPopup(null)}
        >
          {t('newsletter.popup.preview-discard-msg')}
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
        <GenericModalForm
          modalProps={{
            ...sendPopup,
            title: t('newsletter.popup.title-send-sample'),
            okText: t('common.send'),
            okButtonProps: {
              disabled: sendPopup?.sending
            },
            onCancel: () => setSendPopup({ ...sendPopup, visible: false })
          }}
          formProps={{
            onFinish: async (values: any) => {
              setSendPopup({ ...sendPopup, sending: true })
              const sent: any = await handleSendSample(values.email)
              setSendPopup(sent ? null : { ...sendPopup, sending: false })
            }
          }}
        >
          <Form.Item name="email" label={t('newsletter.field.email')} rules={[rule.required()]}>
            <Input />
          </Form.Item>
        </GenericModalForm>
      </div>
    </>
  )
}
