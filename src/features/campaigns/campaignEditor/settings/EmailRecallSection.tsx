import { Col, Form, Input, Row, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { TextValuePair } from 'models/campaign/campaignSettingsFormEelements'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface EmailResendProps {
  emailResendOptions: TextValuePair[]
}

export const EmailRecallSection: FC<EmailResendProps> = ({ emailResendOptions }) => {
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
                  {option.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
