import { Col, Form, Input, Select } from 'antd'
import React, { FC } from 'react'

export const EmailRecallSection: FC = () => {
  return (
    <Form.Item label="Email re-call settings" className="form-controls-display-content">
      <Col span={10}>
        <label className="control-label">Maximum recall attempts</label>
        <Input type="number" />
      </Col>
      <Col span={14}>
        <label className="control-label">Recall frequency</label>
        <Select>
          <Select.Option value="1">6 Months</Select.Option>
        </Select>
      </Col>
    </Form.Item>
  )
}
