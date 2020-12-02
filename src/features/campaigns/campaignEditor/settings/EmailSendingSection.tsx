import { Checkbox, Form } from 'antd'
import CheckboxGroup from 'antd/lib/checkbox/Group'
import Title from 'antd/lib/typography/Title'
import { LabelValuePair } from 'models/campaign/campaignSettingsFormEelements'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface EmailReSendingProps {
  emailReSendingOptions: LabelValuePair[]
}

export const EmailSendingSection: FC<EmailReSendingProps> = ({ emailReSendingOptions }) => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.email-resending-rules')}</Title>
      <Form.Item>
        <CheckboxGroup className="vertical-checkboxes">
          {emailReSendingOptions.map(option => (
            <Checkbox key={option.value} value={option.value}>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Form.Item>
    </>
  )
}
