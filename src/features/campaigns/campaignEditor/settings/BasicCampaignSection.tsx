import { Form, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CampaignEditorProps } from '../base/CampaignEditorForm'

export const BasicCampaignSection: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()
  return (
    <>
      <Form.Item>
        <label className="control-label">{t('campaign-create.settings.campaign-name')}</label>
        <Input placeholder="Basic usage" />
      </Form.Item>
      <Form.Item>
        <label className="control-label">{t('campaign-create.settings.requestor')}</label>
        <TextArea rows={4} />
      </Form.Item>
    </>
  )
}
