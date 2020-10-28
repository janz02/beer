import React, { FC } from 'react'
import { CouponCampaignEditor } from 'features/campaigns/campaign/components/CouponCampaignEditor'
import { useCouponCampaignUtils } from './useCouponCampaignUtils'

export const CouponCampaignCreatePage: FC = () => {
  const campaignUtils = useCouponCampaignUtils()
  return <CouponCampaignEditor editing campaignUtils={campaignUtils} />
}
