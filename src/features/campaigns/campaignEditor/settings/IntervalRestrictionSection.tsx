import { Checkbox, Form } from 'antd'
import CheckboxGroup from 'antd/lib/checkbox/Group'
import React, { FC } from 'react'

export const IntervalRestrictionSection: FC = () => {
  return (
    <Form.Item label="Interval Restrictions" className="form-controls-display-grid">
      <label className="control-label">Email delivery date restrictions</label>
      <CheckboxGroup>
        <Checkbox value="weekday">Weekday</Checkbox>
        <Checkbox value="weekend">Weekend</Checkbox>
        <Checkbox value="feast-day">Feast-day</Checkbox>
        <Checkbox value="saturday-working-day">Saturday working day</Checkbox>
      </CheckboxGroup>
    </Form.Item>
  )
}
