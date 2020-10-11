import React, { useEffect, FC } from 'react'
import { CampaignEditor } from './components/CampaignEditor'
import { useCampaignUtils } from './useCampaignUtils'

export const CampaignViewPage: FC = () => {
  const campaign = useCampaignUtils()
  const { getCoupon } = campaign

  useEffect(() => getCoupon(), [getCoupon])

  return <CampaignEditor editing={false} campaignUtils={campaign} />
}
