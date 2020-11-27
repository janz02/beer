import { Form, Select } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const CampaignAdminSection: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <label className="box-title">{t('campaign-create.settings.campaign-admins-title')}</label>
      <Form.Item className="control-label" label={t('campaign-create.settings.requestor')}>
        <Select>
          <Select.Option value="1">Yanik Silver(Marketing)</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item className="control-label" label={t('campaign-create.settings.approver-validator')}>
        <Select>
          <Select.Option value="1">Gary Hamel(Manager)</Select.Option>
        </Select>
      </Form.Item>
    </>
  )
}
