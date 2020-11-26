import { Form, Select } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const ProductSection: FC = () => {
  const { t } = useTranslation()
  return (
    <Form.Item label={t('campaign-create.settings.product-title')}>
      <label className="control-label">{t('campaign-create.settings.product-label')}</label>
      <Select>
        <Select.Option value="1">Ducati monster 600</Select.Option>
      </Select>
    </Form.Item>
  )
}
