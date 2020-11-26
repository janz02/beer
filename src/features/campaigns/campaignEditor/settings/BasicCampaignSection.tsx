import { Form, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { FC } from 'react'
import { CampaignEditorProps } from '../base/CampaignEditorForm'

export const BasicCampaignSection: FC<CampaignEditorProps> = ({ campaignId }) => {
  return (
    <>
      <Form.Item>
        <label className="control-label">Campaign name</label>
        <Input placeholder="Basic usage" />
      </Form.Item>
      <Form.Item>
        <label className="control-label">Requestor</label>
        <TextArea rows={4} />
      </Form.Item>
    </>
  )
}
