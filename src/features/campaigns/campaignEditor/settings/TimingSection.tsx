import { Col, DatePicker, Form, Row, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useCommonFormRules } from 'hooks'
import { TextValuePair } from 'models/textValuePair'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface TimingSectionProps {
  timingTypes: TextValuePair[]
}

export const TimingSection: FC<TimingSectionProps> = ({ timingTypes }) => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
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
            rules={[rule.required(t('campaign-create.settings.validations.required-field'))]}
          >
            <Select placeholder="Date interval">
              {timingTypes.map(timingType => (
                <Select.Option key={timingType.value} value={timingType.value}>
                  {t(`campaign-create.settings.${timingType.text.toLowerCase()}`)}
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
            rules={[rule.required(t('campaign-create.settings.validations.required-field'))]}
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
            rules={[rule.required(t('campaign-create.settings.validations.required-field'))]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
