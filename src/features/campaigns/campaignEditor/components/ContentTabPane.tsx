import React, { FC } from 'react'
import { CampaignEditorProps } from './CampaignEditorForm'

export const ContentTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  return <div>Content for campaign {campaignId}</div>
}
