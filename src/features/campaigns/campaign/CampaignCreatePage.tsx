import React, { FC } from 'react'
import { CampaignEditor } from 'features/campaigns/campaign/components/CampaignEditor'
import { useCampaign } from './useCampaign'

export const CampaignCreatePage: FC = () => {
  const campaign = useCampaign()
  return <CampaignEditor editing campaign={campaign} />
}
