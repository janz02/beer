import React, { useEffect, FC } from 'react'
import { CouponCampaignEditor } from './components/CouponCampaignEditor'
import { useCouponCampaignUtils } from './useCouponCampaignUtils'

export const CouponCampaignViewPage: FC = () => {
  const campaignUtils = useCouponCampaignUtils()
  const { getCoupon } = campaignUtils

  useEffect(() => getCoupon(), [getCoupon])

  return <CouponCampaignEditor editing={false} campaignUtils={campaignUtils} />
}
