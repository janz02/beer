import './NewsletterEditorHeader.scss'
import React, { FC, useEffect, useRef } from 'react'
import { Select, Button, Tooltip, Dropdown, Menu, Form } from 'antd'
import {
  CloseOutlined,
  EditOutlined,
  EyeOutlined,
  SaveOutlined,
  SendOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { MomentDisplay } from 'components/MomentDisplay'
import { useFormUtils } from 'hooks/useFormUtils'
import Typography from 'antd/lib/typography'
import { useNewsletterEditorHandlerUtils } from './useNewsletterEditorHandlerUtils'
import { FeatureState } from 'models/featureState'

const { Text } = Typography

export interface NewsLetterEditorHeaderProps {
  handleSaveVersion: () => void
}

export const NewsLetterEditorHeader: FC<NewsLetterEditorHeaderProps> = props => {
  const { handleSaveVersion } = props

  const { t } = useTranslation()

  const {
    handleOpenSegmentEmailModal,
    handleOpenTestEmailModal,
    handleOpenRevertModal,
    handleVersionPreviewSwitch,
    handleExitEditor,
    isLatestTemplate,
    isTemplateModified,
    currentTemplateVersionId,
    template,
    saveState
  } = useNewsletterEditorHandlerUtils()

  const saving = saveState === FeatureState.Loading

  const { form, setFieldsValue } = useFormUtils()

  useEffect(() => {
    setFieldsValue({ currentTemplateVersionId })
  }, [currentTemplateVersionId, setFieldsValue, template])

  const selectRef = useRef<any>()

  const sendOptionMenu = (
    <Menu>
      <Menu.Item onClick={handleOpenTestEmailModal}>{t('newsletter.send-sample')}</Menu.Item>
      <Menu.Item onClick={handleOpenSegmentEmailModal}>{t('newsletter.send-segment')}</Menu.Item>
    </Menu>
  )

  const templateName = <Text className="template-name">{template?.name}</Text>

  const versionSelect = (
    <Select
      ref={selectRef}
      onSelect={handleVersionPreviewSwitch}
      // BUG: - Select.value is not bound to currentTemplateVersionId
      // it only works as a default value, the cause is Form.Item which is only used for styling now
      // so if the modification discard popup blocks the change of currentTemplateVersionId
      // the select still will be switched, and it won't be in sync with the displayed template
      value={currentTemplateVersionId}
      style={{ width: '25em' }}
    >
      {template?.history?.map((h, i) => (
        <Select.Option key={h.id} value={h.id!}>
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
        <Button icon={<EditOutlined />} onClick={handleOpenRevertModal}>
          {t('common.restore')}
        </Button>
      )}
      {isLatestTemplate && (
        <Button
          loading={saving}
          disabled={saving}
          icon={<SaveOutlined />}
          onClick={handleSaveVersion}
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
        onClick={handleExitEditor}
      />
    </Tooltip>
  )

  return (
    <div className="nleh">
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
