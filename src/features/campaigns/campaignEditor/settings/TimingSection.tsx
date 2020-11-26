import { Col, DatePicker, Form, Row, Select } from 'antd'
import React, { FC } from 'react'

export const TimingSection: FC = () => {
  return (
    <Form.Item label="Timing">
      <Row>
        <label className="control-label"> Select timing type</label>
        <Select placeholder="Date interval">
          <Select.Option value="1">Valami timing</Select.Option>
        </Select>
      </Row>
      <Row className="flex-wrap-unset">
        <Col>
          <label className="control-label">Start date</label>
          <DatePicker />
        </Col>
        <Col>
          <label className="control-label">End date</label>
          <DatePicker />
        </Col>
      </Row>
    </Form.Item>
  )
}
