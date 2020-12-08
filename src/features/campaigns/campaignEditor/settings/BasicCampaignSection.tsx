import { Form, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useCommonFormRules } from 'hooks'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const BasicCampaignSection: FC = () => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  return (
    <>
      <Form.Item
        required
        name="name"
        className="control-label"
        label={t('campaign-create.settings.campaign-name')}
        rules={[rule.required(t('campaign-create.settings.validations.required-field'))]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        className="control-label"
        label={t('campaign-create.settings.about')}
      >
        <TextArea rows={4} />
      </Form.Item>
    </>
  )
}
