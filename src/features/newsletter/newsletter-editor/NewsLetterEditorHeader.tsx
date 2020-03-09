import React, { FC } from 'react'
import { Select, Button, Tooltip } from 'antd'
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
  handleRevert: () => void
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
    handleRevert,
    handleExit,
    handleSaveVersion,
    handleSendSample,
    handleSendSegment
  } = props

  const { t } = useTranslation()

  return (
    <div className={`${className} nleh`}>
      <span className="nleh__toolbar">
        {template?.name && (
          <div className="nleh__title">
            <span className="nleh--label">{t('newsletter.template')}</span>
            <span className="nleh__title--name">{template.name}</span>
          </div>
        )}
        {!isNewTemplate && (
          <span className="nleh__version">
            <span className="nleh--label">{t('newsletter.version')}</span>
            <Select
              onSelect={handleVersionPreviewSwitch}
              value={currentTemplateVersionId}
              style={{ width: 200 }}
            >
              {template?.history?.map((h, i) => (
                <Select.Option key={h.version} value={h.id!}>
                  {i ? <EyeOutlined /> : <EditOutlined />}
                  <span className="nleh__version--number">{h.version}</span>
                  <MomentDisplay date={h.modifiedAt} mode="date time" />
                </Select.Option>
              ))}
            </Select>
          </span>
        )}
        {!isLatestTemplate && (
          <span>
            <Button icon={<EditOutlined />} onClick={handleRevert}>
              {t('common.restore')}
            </Button>
          </span>
        )}
        {isLatestTemplate && (
          <>
            <span>
              <Button
                disabled={!isTemplateModified}
                icon={<SaveOutlined />}
                onClick={handleSaveVersion}
              >
                {t('common.save')}
              </Button>
            </span>
            <span>
              <Button
                disabled={isTemplateModified}
                icon={<SendOutlined />}
                onClick={handleSendSample}
              >
                {t('newsletter.send-sample')}
              </Button>
            </span>
            <span>
              <Button
                disabled={isTemplateModified}
                icon={<SendOutlined />}
                onClick={handleSendSegment}
              >
                {t('newsletter.send-segment')}
              </Button>
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
