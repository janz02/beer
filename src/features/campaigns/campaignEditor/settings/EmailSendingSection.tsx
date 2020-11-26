import { Checkbox, Form } from 'antd'
import CheckboxGroup from 'antd/lib/checkbox/Group'
import React, { FC } from 'react'

export const EmailSendingSection: FC = () => {
  return (
    <Form.Item label="Email re-sending rules">
      <CheckboxGroup>
        <Checkbox>Rejected email</Checkbox>
        <Checkbox>Temporarily rejected email</Checkbox>
        <Checkbox>Bounced email</Checkbox>
        <Checkbox>Spam</Checkbox>
      </CheckboxGroup>
    </Form.Item>
  )
}
