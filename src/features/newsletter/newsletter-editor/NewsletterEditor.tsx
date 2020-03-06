import React, { FC, useState } from 'react'
import 'grapesjs-preset-newsletter/style/tooltip.css'
import './NewsletterEditor.scss'
import { useTranslation } from 'react-i18next'
import { GenericPopup } from 'components/popups/GenericPopup'
import { Newsletter } from 'models/newsletter'
import { Spin, Form, Input, Select } from 'antd'
import { useNewsletterEditor } from './useNewsletterEditor'
import { NewsLetterEditorHeader, NewsLetterEditorHeaderProps } from './NewsLetterEditorHeader'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { useCommonFormRules } from 'hooks'
import { Segment } from 'models/segment'
const EDITOR_SELECTOR = 'pkm-grapesjs'

export interface NewsletterEditorProps {
  template: Newsletter | null | undefined
  segments: Segment[] | null | undefined
  currentTemplateVersionId?: number
  handleSaveVersion: (template: string) => void
  handleRevert: () => void
  handleVersionPreviewSwitch: (id: number) => void
  handleSendSample: (email: string, subject: string) => void
  handleSendSegment: (segmentId: string, subject: string) => void
  handleGetSegments: () => void
  handleExit: () => void
}

export const NewsletterEditor: FC<NewsletterEditorProps> = props => {
  const {
    template,
    currentTemplateVersionId,
    segments,
    handleVersionPreviewSwitch,
    handleRevert,
    handleSaveVersion,
    handleExit,
    handleSendSample,
    handleSendSegment,
    handleGetSegments
  } = props

  const { t } = useTranslation()
  const rule = useCommonFormRules()

  const [visibleDiscardPopup, setVisibleDiscardPopup] = useState(false)
  const [visibleRevertPopup, setVisibleRevertPopup] = useState(false)
  const [sendSamplePopup, setSendSamplePopup] = useState<{
    visible?: boolean
    sending?: boolean
  } | null>()
  const [sendSegmentPopup, setSendSegmentPopup] = useState<{
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
    handleSendSample: () => setSendSamplePopup({ ...sendSamplePopup, visible: true }),
    handleSendSegment: () => {
      handleGetSegments()
      setSendSegmentPopup({ ...sendSegmentPopup, visible: true })
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
            ...sendSamplePopup,
            title: t('newsletter.popup.title-send-sample'),
            okText: t('common.send'),
            okButtonProps: {
              disabled: sendSamplePopup?.sending
            },
            onCancel: () => setSendSamplePopup({ ...sendSamplePopup, visible: false })
          }}
          formProps={{
            onFinish: async (values: any) => {
              setSendSamplePopup({ ...sendSamplePopup, sending: true })
              const sent: any = await handleSendSample(values.email, values.subject)
              setSendSamplePopup(sent ? null : { ...sendSamplePopup, sending: false })
            }
          }}
        >
          <Form.Item
            name="subject"
            label={t('newsletter.field.subject')}
            rules={[rule.required(), rule.max(45)]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label={t('newsletter.field.email')}
            rules={[rule.required(), rule.email()]}
          >
            <Input />
          </Form.Item>
        </GenericModalForm>

        <GenericModalForm
          modalProps={{
            ...sendSegmentPopup,
            title: t('newsletter.popup.title-send-segment'),
            okText: t('common.send'),
            okButtonProps: {
              disabled: sendSegmentPopup?.sending
            },
            onCancel: () => setSendSegmentPopup({ ...sendSegmentPopup, visible: false })
          }}
          formProps={{
            onFinish: async (values: any) => {
              setSendSegmentPopup({ ...sendSegmentPopup, sending: true })
              const sent: any = await handleSendSegment(values.segment, values.subject)
              setSendSegmentPopup(sent ? null : { ...sendSegmentPopup, sending: false })
            }
          }}
        >
          <Form.Item
            name="subject"
            label={t('newsletter.field.subject')}
            rules={[rule.required(), rule.max(45)]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="segment"
            label={t('newsletter.popup.target-segment')}
            rules={[rule.required()]}
          >
            <Select loading onChange={(e: any) => console.log(e)}>
              {segments?.map(s => (
                <Select.Option key={s.id} value={s.id}>
                  {s.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </GenericModalForm>
      </div>
    </>
  )
}
