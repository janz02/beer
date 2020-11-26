import { Form, Select } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const CampaignAdminSection: FC = () => {
  const { t } = useTranslation()
  return (
    <Form.Item label={t('campaign-create.settings.campaign-admins-title')}>
      <label className="control-label">{t('campaign-create.settings.requestor')}</label>
      <Select>
        <Select.Option value="1">Yanik Silver(Marketing)</Select.Option>
      </Select>
      <label className="control-label">{t('campaign-create.settings.approver-validator')}</label>
      <Select>
        <Select.Option value="1">Gary Hamel(Manager)</Select.Option>
      </Select>
    </Form.Item>
  )
}
