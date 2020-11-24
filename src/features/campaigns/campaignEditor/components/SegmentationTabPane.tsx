import React, { FC } from 'react'
import { CampaignEditorProps } from './CampaignEditorForm'

export const SegmentationTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  return <div>Segmentation Content for campaign {campaignId}</div>
}
