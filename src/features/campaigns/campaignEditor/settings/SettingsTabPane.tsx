import React, { FC } from 'react'
import { CampaignEditorProps } from '../base/CampaignEditorForm'

export const SettingsTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  return <div>Settings Content for campaign {campaignId}</div>
}
