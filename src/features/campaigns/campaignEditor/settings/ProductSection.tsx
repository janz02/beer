import { Form, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { TextValuePair } from 'models/campaign/campaignSettingsFormEelements'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface ProductProps {
  products: TextValuePair[]
}

export const ProductSection: FC<ProductProps> = ({ products }) => {
  const { t } = useTranslation()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.product-title')}</Title>
      <Form.Item
        name="productId"
        required
        className="control-label"
        label={t('campaign-create.settings.product-label')}
      >
        <Select>
          {products.map(product => (
            <Select.Option key={product.value} value={product.value}>
              {product.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  )
}
