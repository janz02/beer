import { Form, Radio } from 'antd'
import Title from 'antd/lib/typography/Title'
import { TextValuePair } from 'models/campaign/campaignSettingsFormEelements'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CampaignEditorProps } from '../base/CampaignEditorForm'

export interface ChannelTypesProps {
  channelTypes: TextValuePair[]
}

export const ChannelTypeSection: FC<ChannelTypesProps> = ({ channelTypes }) => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.channel-type-title')}</Title>
      <Form.Item>
        <Radio.Group>
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
