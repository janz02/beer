import { Col, Form, Input, Row, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { TextValuePair } from 'models/textValuePair'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface EmailResendSectionProps {
  emailResendOptions: TextValuePair[]
}

export const EmailResendSection: FC<EmailResendSectionProps> = ({ emailResendOptions }) => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.email-recall-settings-title')}</Title>
      <Row gutter={5}>
        <Col span={10}>
          <Form.Item
            name={['emailChannelSettings', 'emailMaxReSends']}
            className="control-label"
            label={t('campaign-create.settings.maximum-recall-attempts')}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={14}>
          <Form.Item
            className="control-label"
            name={['emailChannelSettings', 'emailResendFrequencyId']}
            label={t('campaign-create.settings.recall-frequency')}
          >
            <Select>
              {emailResendOptions.map(option => (
                <Select.Option key={option.value} value={option.value}>
                  {t(`campaign-create.settings.${option.text.toLowerCase()}`)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
