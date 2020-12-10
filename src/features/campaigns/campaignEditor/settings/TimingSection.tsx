import { Col, DatePicker, Form, Row, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useCommonFormRules } from 'hooks'
import { TextValuePair } from 'models/textValuePair'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
export interface TimingSectionProps {
  timingTypes: TextValuePair[]
}

export const TimingSection: FC<TimingSectionProps> = ({ timingTypes }) => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const [selectedDateInterval, setSelectedDateInterval] = useState<number>()
  const { RangePicker } = DatePicker
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.timing-title')}</Title>
      <Row>
        <Col span={12}>
          <Form.Item
            required
            name={['timing', 'timingTypeId']}
            className="control-label"
            label={t('campaign-create.settings.select-timing-type-label')}
            rules={[rule.required(t('campaign-create.settings.validations.required-field'))]}
          >
            <Select
              placeholder="Date interval"
              onChange={(selectedValue: number) => {
                setSelectedDateInterval(selectedValue)
              }}
            >
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
        {selectedDateInterval === 1 ? (
          <Col span={24}>
            <Form.Item
              required
              className="control-label"
              name={['timing', 'rangePicker']}
              label={t('campaign-create.settings.date-range')}
              rules={[rule.required(t('campaign-create.settings.validations.required-field'))]}
            >
              <RangePicker />
            </Form.Item>
          </Col>
        ) : selectedDateInterval === 2 ? (
          <Col span={24}>
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
        ) : selectedDateInterval === 3 ? (
          <Col span={24}>
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
        ) : (
          <></>
        )}
      </Row>
    </>
  )
}
