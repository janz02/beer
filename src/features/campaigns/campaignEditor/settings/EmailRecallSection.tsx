import { Col, Form, Input, Select } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const EmailRecallSection: FC = () => {
  const { t } = useTranslation()
  return (
    <Form.Item
      label={t('campaign-create.settings.email-recall-settings-title')}
      className="form-controls-display-content"
    >
      <Col span={10}>
        <label className="control-label">
          {t('campaign-create.settings.maximum-recall-attempts')}
        </label>
        <Input type="number" />
      </Col>
      <Col span={14}>
        <label className="control-label">{t('campaign-create.settings.recall-frequency')}</label>
        <Select>
          <Select.Option value="1">6 Months</Select.Option>
        </Select>
      </Col>
    </Form.Item>
  )
}
