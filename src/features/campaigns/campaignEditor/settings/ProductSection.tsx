import { Form, Select } from 'antd'
import React, { FC } from 'react'

export const ProductSection: FC = () => {
  return (
    <Form.Item label="Product">
      <label className="control-label">Product</label>
      <Select>
        <Select.Option value="1">Ducati monster 600</Select.Option>
      </Select>
    </Form.Item>
  )
}
