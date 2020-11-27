import { Form, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CampaignEditorProps } from '../base/CampaignEditorForm'

export const BasicCampaignSection: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()
  return (
    <>
      <Form.Item className="control-label" label={t('campaign-create.settings.campaign-name')}>
        <Input />
      </Form.Item>
      <Form.Item className="control-label" label={t('campaign-create.settings.about')}>
        <TextArea rows={4} />
      </Form.Item>
    </>
  )
}
