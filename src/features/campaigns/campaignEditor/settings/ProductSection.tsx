import { Form, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const ProductSection: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.product-title')}</Title>
      <Form.Item className="control-label" label={t('campaign-create.settings.product-label')}>
        <Select>
          <Select.Option value="1">Ducati monster 600</Select.Option>
        </Select>
      </Form.Item>
    </>
  )
}
