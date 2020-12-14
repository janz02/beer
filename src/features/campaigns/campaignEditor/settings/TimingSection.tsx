import { Col, Form, Row, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useCommonFormRules } from 'hooks'
import { TextValuePair } from 'models/textValuePair'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DateSelector } from './DateSelector'
export interface TimingSectionProps {
  timingTypes: TextValuePair[]
}

export const TimingSection: FC<TimingSectionProps> = ({ timingTypes }) => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const [selectedDateInterval, setSelectedDateInterval] = useState<number>()
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
      <DateSelector selectedDateInterval={selectedDateInterval} />
    </>
  )
}
