import { Col, DatePicker, Form, Row, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { TextValuePair } from 'models/campaign/campaignSettingsFormEelements'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface TimingProps {
  timingTypes: TextValuePair[]
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
            name={['timing', 'timingTypeId']}
            className="control-label"
            label={t('campaign-create.settings.select-timing-type-label')}
          >
            <Select placeholder="Date interval">
              {timingTypes.map(timingType => (
                <Select.Option key={timingType.value} value={timingType.value}>
                  {timingType.text}
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
            name={['timing', 'startDate']}
            className="control-label"
            label={t('campaign-create.settings.start-date')}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            required
            name={['timing', 'endDate']}
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
