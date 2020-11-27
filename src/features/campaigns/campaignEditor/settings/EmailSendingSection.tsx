import { Checkbox, Form } from 'antd'
import CheckboxGroup from 'antd/lib/checkbox/Group'
import Title from 'antd/lib/typography/Title'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const EmailSendingSection: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.email-resending-rules')}</Title>
      <Form.Item>
        <CheckboxGroup className="vertical-checkboxes">
          <Checkbox>Rejected email</Checkbox>
          <Checkbox>Temporarily rejected email</Checkbox>
          <Checkbox>Bounced email</Checkbox>
          <Checkbox>Spam</Checkbox>
        </CheckboxGroup>
      </Form.Item>
    </>
  )
}
