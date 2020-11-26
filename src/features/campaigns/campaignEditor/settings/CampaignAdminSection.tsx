import { Form, Select } from 'antd'
import React, { FC } from 'react'

export const CampaignAdminSection: FC = () => {
  return (
    <Form.Item label="Campaign admins">
      <label className="control-label">Requestor</label>
      <Select>
        <Select.Option value="1">Yanik Silver(Marketing)</Select.Option>
      </Select>
      <label className="control-label"> Approver/Validator</label>
      <Select>
        <Select.Option value="1">Gary Hamel(Manager)</Select.Option>
      </Select>
    </Form.Item>
  )
}
