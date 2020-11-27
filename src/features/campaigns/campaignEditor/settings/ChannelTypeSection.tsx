import { Form, Radio } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CampaignEditorProps } from '../base/CampaignEditorForm'

export const ChannelTypeSection: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.channel-type-title')}</Title>
      <Form.Item>
        <Radio.Group defaultValue="email">
          <Radio value="email">Email</Radio>
          <Radio value="sms">SMS</Radio>
          <Radio value="callCenter">Call Center</Radio>
          <Radio value="pushNotification">Push Notification</Radio>
        </Radio.Group>
      </Form.Item>
    </>
  )
}
