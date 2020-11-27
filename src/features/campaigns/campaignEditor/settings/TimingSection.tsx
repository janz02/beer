import { Col, DatePicker, Form, Row, Select } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const TimingSection: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <label className="box-title">{t('campaign-create.settings.timing-title')}</label>
      <Row>
        <Col>
          <Form.Item
            className="control-label"
            label={t('campaign-create.settings.select-timing-type-label')}
          >
            <Select placeholder="Date interval">
              <Select.Option value="1">Valami timing</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col />
      </Row>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item className="control-label" label={t('campaign-create.settings.start-date')}>
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item className="control-label" label={t('campaign-create.settings.end-date')}>
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
