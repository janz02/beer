import React from 'react'
import { useParams } from 'react-router-dom'

export const CampaignEditorPage: React.FC = () => {
  const params = useParams<{ campaignId?: string }>()
  const id = params.campaignId ? +params.campaignId : undefined

  return <div>{id}</div>
}
