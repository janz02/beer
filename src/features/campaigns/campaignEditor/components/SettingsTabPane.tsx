import React, { FC } from 'react'
import { CampaignEditorProps } from './CampaignEditorForm'

export const SettingsTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  return <div>Settings Content for campaign {campaignId}</div>
}
