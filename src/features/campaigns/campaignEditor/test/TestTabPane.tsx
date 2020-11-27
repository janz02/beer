import React, { FC } from 'react'
import { CampaignEditorProps } from '../base/CampaignEditorForm'

export const TestTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  return <div>Test Content for campaign {campaignId}</div>
}
