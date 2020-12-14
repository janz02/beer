import { Checkbox, Form } from 'antd'
import Title from 'antd/lib/typography/Title'
import { TextValuePair } from 'models/textValuePair'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface EmailReSendingProps {
  emailReSendingOptions: TextValuePair[]
}

export const EmailReSendingRulesSection: FC<EmailReSendingProps> = ({ emailReSendingOptions }) => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.email-resending-rules')}</Title>
      <Form.Item name={['emailChannelSettings', 'resendingRuleOptions']}>
        <Checkbox.Group className="vertical-checkboxes">
          {emailReSendingOptions.map(option => (
            <Checkbox key={option.value} value={option.value}>
              {t(`campaign-create.settings.${option.text.toLowerCase()}`)}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    </>
  )
}
