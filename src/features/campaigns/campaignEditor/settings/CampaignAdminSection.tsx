import { Form, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useCommonFormRules } from 'hooks'
import { TextValuePair } from 'models/textValuePair'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface CampaignAdminSectionProps {
  users: TextValuePair[]
}

export const CampaignAdminSection: FC<CampaignAdminSectionProps> = ({ users }) => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.campaign-admins-title')}</Title>
      <Form.Item
        required
        name="requestorId"
        className="control-label"
        label={t('campaign-create.settings.requestor')}
        rules={[rule.required(t('campaign-create.settings.validations.required-field'))]}
      >
        <Select>
          {users.map(requester => (
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
        rules={[rule.required(t('campaign-create.settings.validations.required-field'))]}
      >
        <Select>
          {users.map(responsible => (
            <Select.Option key={responsible.value} value={responsible.value}>
              {responsible.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  )
}
