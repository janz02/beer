import { Form, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { LabelValuePair } from 'models/campaign/campaignSettingsFormEelements'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface CampaignAdminProps {
  requesters: LabelValuePair[]
  responsibles: LabelValuePair[]
}

export const CampaignAdminSection: FC<CampaignAdminProps> = ({ requesters, responsibles }) => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.campaign-admins-title')}</Title>
      <Form.Item required className="control-label" label={t('campaign-create.settings.requestor')}>
        <Select>
          {requesters.map(requester => (
            <Select.Option key={requester.value} value={requester.value}>
              {requester.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        required
        className="control-label"
        label={t('campaign-create.settings.approver-validator')}
      >
        <Select>
          {responsibles.map(responsible => (
            <Select.Option key={responsible.value} value={responsible.value}>
              {responsible.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  )
}
