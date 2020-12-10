import { Form, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useCommonFormRules } from 'hooks'
import { TextValuePair } from 'models/textValuePair'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface ProductSectionProps {
  products: TextValuePair[]
}

export const ProductSection: FC<ProductSectionProps> = ({ products }) => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  return (
    <>
      <Title level={5}>{t('campaign-create.settings.product-title')}</Title>
      <Form.Item
        name="productId"
        required
        className="control-label"
        label={t('campaign-create.settings.product-label')}
        rules={[rule.required(t('campaign-create.settings.validations.required-field'))]}
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
