import { Form, Radio } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useCampaignSettingsUtils } from './useCampaignSettingsUtils'

interface ChannelTypeSectionProps {
  onChange: (channelChosen: number) => void
}

export const ChannelTypeSection: FC<ChannelTypeSectionProps> = ({ onChange }) => {
  const { t } = useTranslation()
  const { campaignSettingsFormElements } = useCampaignSettingsUtils()
  const { channels } = campaignSettingsFormElements
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.channel-type-title')}</Title>
      <Form.Item name="channelId" required>
        <Radio.Group
          onChange={e => {
            onChange(e.target.value)
          }}
        >
          {channels.map(option => (
            <Radio key={option.value} value={option.value}>
              {option.text}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </>
  )
}
