import React, { FC } from 'react'
import { CampaignEditorProps } from '../../base/CampaignEditorForm'

export const EmailContentTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  return (
    <div>
      <div id="editor" />
    </div>
  )
}
