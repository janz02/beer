import { Col, DatePicker, Form, Row } from 'antd'
import { useCommonFormRules } from 'hooks'
import { TimingTypes } from 'models/timingTypes'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface DateSelector {
  selectedDateInterval?: number
}

export const DateSelector: FC<DateSelector> = ({ selectedDateInterval }) => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const { RangePicker } = DatePicker
  switch (selectedDateInterval) {
    case TimingTypes.DateInterval:
      return (
        <Row gutter={10}>
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
        </Row>
      )
    case TimingTypes.DateFrom:
      return (
        <Row gutter={10}>
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
        </Row>
      )
    case TimingTypes.DateTo:
      return (
        <Row gutter={10}>
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
        </Row>
      )
    default:
      return <></>
  }
}
