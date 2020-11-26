import { Col, Form, TimePicker } from 'antd'
import React, { FC } from 'react'

export const DailyRestrictionSection: FC = () => {
  return (
    <Form.Item label="Daily restriction" className="form-controls-display-content">
      <Col>
        <label className="control-label">Start time</label>
        <TimePicker />
      </Col>
      <Col>
        <label className="control-label">End time</label>
        <TimePicker />
      </Col>
    </Form.Item>
  )
}
