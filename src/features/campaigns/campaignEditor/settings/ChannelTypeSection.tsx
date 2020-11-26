import { Form, Radio } from 'antd'
import React, { FC } from 'react'
import { CampaignEditorProps } from '../base/CampaignEditorForm'

export const ChannelTypeSection: FC<CampaignEditorProps> = ({ campaignId }) => {
  return (
    <Form.Item label="Channel type">
      <Radio.Group defaultValue="email">
        <Radio value="email">Email</Radio>
        <Radio value="sms">SMS</Radio>
        <Radio value="callCenter">Call Center</Radio>
        <Radio value="pushNotification">Push Notification</Radio>
      </Radio.Group>
    </Form.Item>
  )
}
