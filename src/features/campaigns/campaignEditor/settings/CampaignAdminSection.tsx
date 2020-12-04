import { Form, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { TextValuePair } from 'models/campaign/campaignSettingsFormEelements'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface CampaignAdminProps {
  requesters: TextValuePair[]
  responsibles: TextValuePair[]
}

export const CampaignAdminSection: FC<CampaignAdminProps> = ({ requesters, responsibles }) => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.campaign-admins-title')}</Title>
      <Form.Item
        required
        name="requestorId"
        className="control-label"
        label={t('campaign-create.settings.requestor')}
      >
        <Select>
          {requesters.map(requester => (
            <Select.Option key={requester.value} value={requester.value}>
              {requester.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        required
        name="responsibleId"
        className="control-label"
        label={t('campaign-create.settings.approver-validator')}
      >
        <Select>
          {responsibles.map(responsible => (
            <Select.Option key={responsible.value} value={responsible.value}>
              {responsible.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  )
}
