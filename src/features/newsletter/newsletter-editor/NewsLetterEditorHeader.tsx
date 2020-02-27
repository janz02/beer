import React, { FC } from 'react'
import { Select, Button, Tooltip } from 'antd'
import { CloseOutlined, EditOutlined, EyeOutlined, SaveOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { NewsletterData } from 'models/newsletter'
import './NewsletterEditorHeader.scss'

export interface NewsLetterEditorHeaderProps {
  className?: string
  template: NewsletterData | null | undefined
  currentTemplateVersionId?: number
  isNewTemplate: boolean
  isTemplateModified: boolean
  isLatestTemplate: boolean
  handleSaveVersion: () => void
  handleRevert: () => void
  handleVersionPreviewSwitch: (id: number) => void
  handleExit: () => void
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
    handleSaveVersion
  } = props

  const { t } = useTranslation()

  return (
    <div className={`${className} nleh`}>
      <span className="nleh__toolbar">
        {template?.name && <span className="nleh__title">{template.name}</span>}
        {!isNewTemplate && (
          <span>
            <Select
              onSelect={handleVersionPreviewSwitch}
              value={currentTemplateVersionId}
              style={{ width: 200 }}
            >
              {template?.history?.map((h, i) => (
                <Select.Option key={h.version} value={h.id!}>
                  {i ? <EyeOutlined /> : <EditOutlined />}
                  <span className="nleh__version-number">{h.version}</span>
                  {h.modifiedAt?.format('YYYY.MM.DD HH:mm')}
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
          <span>
            <Button
              disabled={!isTemplateModified}
              icon={<SaveOutlined />}
              onClick={handleSaveVersion}
            >
              {t('common.save')}
            </Button>
          </span>
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
