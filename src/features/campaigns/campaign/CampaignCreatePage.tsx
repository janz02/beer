import React, { FC } from 'react'
import { CampaignEditor } from 'features/campaigns/campaign/components/CampaignEditor'
import { useCampaignUtils } from './useCampaignUtils'

export const CampaignCreatePage: FC = () => {
  const campaignUtils = useCampaignUtils()
  return <CampaignEditor editing campaignUtils={campaignUtils} />
}
