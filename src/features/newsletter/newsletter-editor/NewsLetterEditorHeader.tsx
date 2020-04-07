import React, { FC, useState } from 'react'
import { Select, Button, Tooltip, Dropdown, Menu } from 'antd'
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
    isNewTemplate,
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

  const sendOptions = (
    <Menu>
      <Menu.Item onClick={handleSendSample}>{t('newsletter.send-sample')}</Menu.Item>
      <Menu.Item onClick={handleSendSegment}>{t('newsletter.send-segment')}</Menu.Item>
    </Menu>
  )

  return (
    <div className={`${className} nleh`}>
      <span className="nleh__toolbar">
        {template?.name && (
          <div className="nleh__title">
            <span className="nleh--label">{t('newsletter.template')}</span>
            <Tooltip
              mouseEnterDelay={0.9}
              placement="bottomLeft"
              title={template.name.length < 24 ? '' : template.name}
            >
              <span className="nleh__title--name">{template.name}</span>
            </Tooltip>
          </div>
        )}
        {!isNewTemplate && (
          <span className="nleh__version">
            <span className="nleh--label">{t('newsletter.version')}</span>
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
          </span>
        )}
        {!isLatestTemplate && (
          <span>
            <Button icon={<EditOutlined />} onClick={handleRestoreVersion}>
              {t('common.restore')}
            </Button>
          </span>
        )}
        {isLatestTemplate && (
          <>
            <span>
              <Button
                loading={saving}
                disabled={saving}
                icon={<SaveOutlined />}
                onClick={handleSave}
                type={isTemplateModified ? 'primary' : 'default'}
              >
                {t('common.save')}
              </Button>
            </span>
            <span>
              <Dropdown overlay={sendOptions} placement="bottomLeft">
                <Button icon={<SendOutlined />}>{t('common.send')}</Button>
              </Dropdown>
            </span>
          </>
        )}
      </span>
      <Tooltip mouseEnterDelay={0.65} placement="bottomRight" title={t('newsletter.close-editor')}>
        <Button
          danger={isTemplateModified}
          className="nleh__close"
          type="link"
          icon={<CloseOutlined />}
          onClick={handleExit}
        />
      </Tooltip>
    </div>
  )
}
