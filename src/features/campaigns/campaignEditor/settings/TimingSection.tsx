import { Col, DatePicker, Form, Row, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { LabelValuePair } from 'models/campaign/campaignSettingsFormEelements'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface TimingProps {
  timingTypes: LabelValuePair[]
}

export const TimingSection: FC<TimingProps> = ({ timingTypes }) => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.timing-title')}</Title>
      <Row>
        <Col>
          <Form.Item
            required
            className="control-label"
            label={t('campaign-create.settings.select-timing-type-label')}
          >
            <Select placeholder="Date interval">
              {timingTypes.map(timingType => (
                <Select.Option key={timingType.value} value={timingType.value}>
                  {timingType.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col />
      </Row>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            required
            className="control-label"
            label={t('campaign-create.settings.start-date')}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            required
            className="control-label"
            label={t('campaign-create.settings.end-date')}
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
