import { Checkbox, Form } from 'antd'
import CheckboxGroup from 'antd/lib/checkbox/Group'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const EmailSendingSection: FC = () => {
  const { t } = useTranslation()
  return (
    <Form.Item label={t('campaign-create.settings.email-resending-rules')}>
      <CheckboxGroup>
        <Checkbox>Rejected email</Checkbox>
        <Checkbox>Temporarily rejected email</Checkbox>
        <Checkbox>Bounced email</Checkbox>
        <Checkbox>Spam</Checkbox>
      </CheckboxGroup>
    </Form.Item>
  )
}
