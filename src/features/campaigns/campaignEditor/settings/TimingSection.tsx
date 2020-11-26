import { Col, DatePicker, Form, Row, Select } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const TimingSection: FC = () => {
  const { t } = useTranslation()
  return (
    <Form.Item label={t('campaign-create.settings.timing-title')}>
      <Row>
        <label className="control-label">
          {t('campaign-create.settings.select-timing-type-label')}
        </label>
        <Select placeholder="Date interval">
          <Select.Option value="1">Valami timing</Select.Option>
        </Select>
      </Row>
      <Row className="flex-wrap-unset">
        <Col>
          <label className="control-label">{t('campaign-create.settings.start-date')}</label>
          <DatePicker />
        </Col>
        <Col>
          <label className="control-label">{t('campaign-create.settings.end-date')}</label>
          <DatePicker />
        </Col>
      </Row>
    </Form.Item>
  )
}
