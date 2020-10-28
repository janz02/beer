import React, { FC } from 'react'
import { CouponCampaignEditor } from 'features/couponCampaigns/couponCampaignEditor/components/CouponCampaignEditor'
import { useCouponCampaignUtils } from './useCouponCampaignUtils'

export const CouponCampaignCreatePage: FC = () => {
  const campaignUtils = useCouponCampaignUtils()
  return <CouponCampaignEditor editing campaignUtils={campaignUtils} />
}
