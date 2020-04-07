import React, { FC, useState, useEffect } from 'react'
import { Select, Button, Tooltip, Dropdown, Menu, Form } from 'antd'
import {
  CloseOutlined,
  EditOutlined,
  EyeOutlined,
  SaveOutlined,
  SendOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Newsletter } from 'models/newsletter'
import './NewsletterEditorHeader.scss'
import { MomentDisplay } from 'components/MomentDisplay'
import { useFormUtils } from 'hooks/useFormUtils'
import Typography from 'antd/lib/typography'

const { Text } = Typography

export interface NewsLetterEditorHeaderProps {
  className?: string
  template: Newsletter | null | undefined
  currentTemplateVersionId?: number
  isNewTemplate: boolean
  isTemplateModified: boolean
  isLatestTemplate: boolean
  handleSaveVersion: () => void
  handleRestoreVersion: () => void
  handleVersionPreviewSwitch: (id: number) => void
  handleExit: () => void
  handleSendSample: () => void
  handleSendSegment: () => void
}

export const NewsLetterEditorHeader: FC<NewsLetterEditorHeaderProps> = props => {
  const {
    className,
    template,
    currentTemplateVersionId,
    isLatestTemplate,
    isTemplateModified,
    handleVersionPreviewSwitch,
    handleRestoreVersion,
    handleExit,
    handleSaveVersion,
    handleSendSample,
    handleSendSegment
  } = props

  const { t } = useTranslation()

  const [saving, setSaving] = useState(false)

  const handleSave = async (): Promise<any> => {
    setSaving(true)
    await handleSaveVersion()
    setSaving(false)
  }

  const { form, setFieldsValue } = useFormUtils()

  useEffect(() => {
    setFieldsValue({ currentTemplateVersionId })
  }, [currentTemplateVersionId, setFieldsValue, template])

  const sendOptionMenu = (
    <Menu>
      <Menu.Item onClick={handleSendSample}>{t('newsletter.send-sample')}</Menu.Item>
      <Menu.Item onClick={handleSendSegment}>{t('newsletter.send-segment')}</Menu.Item>
    </Menu>
  )

  const templateName = <Text className="template-name">{template?.name}</Text>

  const versionSelect = (
    <Select
      onSelect={handleVersionPreviewSwitch}
      value={currentTemplateVersionId}
      style={{ width: '25em' }}
    >
      {template?.history?.map((h, i) => (
        <Select.Option key={h.version} value={h.id!}>
          {i ? <EyeOutlined /> : <EditOutlined />}
          <span className="nleh__version--number">v{h.version}</span>
          <span className="nleh__version--date">
            <MomentDisplay date={h.modifiedAt} mode="date time" />
          </span>
          <span className="nleh__version--modified">[{h.modifiedBy}]</span>
        </Select.Option>
      ))}
    </Select>
  )

  const optionButtons = (
    <>
      {!isLatestTemplate && (
        <Button icon={<EditOutlined />} onClick={handleRestoreVersion}>
          {t('common.restore')}
        </Button>
      )}
      {isLatestTemplate && (
        <Button
          loading={saving}
          disabled={saving}
          icon={<SaveOutlined />}
          onClick={handleSave}
          type={isTemplateModified ? 'primary' : 'default'}
        >
          {t('common.save')}
        </Button>
      )}
      {isLatestTemplate && (
        <Dropdown overlay={sendOptionMenu} placement="bottomLeft">
          <Button icon={<SendOutlined />}>{t('common.send')}</Button>
        </Dropdown>
      )}
    </>
  )

  const closeButton = (
    <Tooltip mouseEnterDelay={0.65} placement="bottomRight" title={t('newsletter.close-editor')}>
      <Button
        danger={isTemplateModified}
        className="nleh__close"
        type="link"
        icon={<CloseOutlined />}
        onClick={handleExit}
      />
    </Tooltip>
  )

  return (
    <div className={`${className} nleh`}>
      <Form className="nleh__toolbar" name="newsletter-template-editor" layout="inline" form={form}>
        <Form.Item label={t('newsletter.template')}>{templateName}</Form.Item>
        <Form.Item label={t('newsletter.version')} name="currentTemplateVersionId">
          {versionSelect}
        </Form.Item>
        <Form.Item>{optionButtons}</Form.Item>
      </Form>
      {closeButton}
    </div>
  )
}
