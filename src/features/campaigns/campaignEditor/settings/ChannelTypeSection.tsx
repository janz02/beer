import { Form, Radio } from 'antd'
import Title from 'antd/lib/typography/Title'
import { TextValuePair } from 'models/campaign/campaignSettingsFormEelements'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface ChannelTypeSectionProps {
  channelTypes: TextValuePair[]
  onChange: (channelChosen: number) => void
}

export const ChannelTypeSection: FC<ChannelTypeSectionProps> = ({ channelTypes, onChange }) => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.channel-type-title')}</Title>
      <Form.Item name="channelId">
        <Radio.Group
          onChange={e => {
            onChange(e.target.value)
          }}
        >
          {channelTypes.map(option => (
            <Radio key={option.value} value={option.value}>
              {option.text}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </>
  )
}
