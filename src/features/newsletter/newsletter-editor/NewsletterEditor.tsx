import React, { FC, useState } from 'react'
import 'grapesjs-preset-newsletter/style/tooltip.css'
import './NewsletterEditor.scss'
import { useTranslation } from 'react-i18next'
import { GenericPopup } from 'components/popups/GenericPopup'
import { Newsletter } from 'models/newsletter'
import { Spin, Form, Input, Select, Button, Result } from 'antd'
import { useNewsletterEditor } from './useNewsletterEditor'
import { NewsLetterEditorHeader, NewsLetterEditorHeaderProps } from './NewsLetterEditorHeader'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { useCommonFormRules } from 'hooks'
import { Segment } from 'models/segment'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { NewsletterTemplateState } from './newsletterEditorSlice'
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import { history } from 'router/router'
const EDITOR_SELECTOR = 'pkm-grapesjs'

export interface NewsletterEditorProps {
  template: Newsletter | null | undefined
  segments: Segment[] | null | undefined
  currentTemplateVersionId?: number
  handleTemplateReload: () => void
  handleSaveVersion: (template: string) => void
  handleRevert: () => void
  handleVersionPreviewSwitch: (id: number) => void
  handleSendSample: (email: string, subject: string) => void
  handleSendSegment: (segmentId: number, subject: string) => void
  handleGetSegments: () => void
  handleExit: () => void
  loadingEmail?: boolean
  templateState?: NewsletterTemplateState
}

export const NewsletterEditor: FC<NewsletterEditorProps> = props => {
  const {
    loadingEmail,
    templateState,
    template,
    currentTemplateVersionId,
    segments,
    handleVersionPreviewSwitch,
    handleRevert,
    handleSaveVersion,
    handleExit,
    handleSendSample,
    handleSendSegment,
    handleGetSegments,
    handleTemplateReload
  } = props

  const { t } = useTranslation()
  const rule = useCommonFormRules()

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
    handleExit,
    handleVersionPreviewSwitch: (id: number) => {
      if (isTemplateModified) {
        setSwitchPopup({ visible: true, versionId: id })
      } else {
        handleVersionPreviewSwitch(id)
      }
    },
    handleRestoreVersion: () => setVisibleRevertPopup(true),
    handleSaveVersion: () => handleSaveVersion(getEditorContent()),
    handleSendSample: async () => {
      await setSendSamplePopup({ ...sendSamplePopup, visible: true })
    },
    handleSendSegment: async () => {
      await handleGetSegments()
      setSendSegmentPopup({ ...sendSegmentPopup, visible: true })
    }
  }

  const sendSample = async (values: any): Promise<void> => {
    setSendSamplePopup({ ...sendSamplePopup, sending: true })
    const sent: any = await handleSendSample(values.email, values.subject)
    setSendSamplePopup(sent ? null : { ...sendSamplePopup, sending: false })
  }

  const sendSegment = async (values: any): Promise<void> => {
    setSendSegmentPopup({ ...sendSegmentPopup, sending: true })
    const sent: any = await handleSendSegment(+values.segment, values.subject)
    setSendSegmentPopup(sent ? null : { ...sendSegmentPopup, sending: false })
  }

  return (
    <>
      <NavigationAlert when={isTemplateModified} />

      <Spin
        className="nle-spinner"
        spinning={templateState !== NewsletterTemplateState.FailedToLoad && loading}
        size="large"
      />

      <div hidden={templateState !== NewsletterTemplateState.FailedToLoad} className="nle">
        <Result
          status="warning"
          title={t('newsletter.fail-msg')}
          extra={
            <>
              <Button onClick={() => history.push('/newsletter')}>
                <ArrowLeftOutlined />
                {t('common.go-back-to-list')}
              </Button>
              <Button onClick={handleTemplateReload}>
                <ReloadOutlined />
                {t('common.try-again')}
              </Button>
            </>
          }
        />
      </div>

      <div hidden={loading} className="nle">
        <NewsLetterEditorHeader className="nle__header" {...headerProps} />

        <div className="nle__containter">
          <div id={EDITOR_SELECTOR} />
        </div>

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
          loadingAction={loadingEmail}
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
            onFinish: sendSample
          }}
        >
          <Form.Item
            name="subject"
            label={t('newsletter.field.subject')}
            rules={[
              rule.requiredString(t('error.validation.email.subject-required')),
              rule.max(45)
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label={t('newsletter.field.email')}
            rules={[
              rule.requiredString(t('error.validation.segment.email-required')),
              rule.email()
            ]}
          >
            <Input />
          </Form.Item>
        </GenericModalForm>

        <GenericModalForm
          loadingAction={loadingEmail}
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
            onFinish: sendSegment
          }}
        >
          <Form.Item
            name="subject"
            label={t('newsletter.field.subject')}
            rules={[
              rule.requiredString(t('error.validation.email.subject-required')),
              rule.max(45)
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="segment"
            label={t('newsletter.popup.target-segment')}
            rules={[rule.requiredString(t('error.validation.segment.id-required'))]}
          >
            <Select>
              {segments?.map(s => (
                <Select.Option key={s.id} value={s.id}>
                  {s.name} - ({s.segmentSize})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </GenericModalForm>
      </div>
    </>
  )
}
