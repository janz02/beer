import React, { useEffect, FC } from 'react'
import { CouponCampaignEditor } from './components/CouponCampaignEditor'
import { useCouponCampaignUtils } from './useCouponCampaignUtils'

export const CouponCampaignEditorPage: FC = () => {
  const campaignUtils = useCouponCampaignUtils()
  const { getCoupon } = campaignUtils

  useEffect(() => getCoupon(), [getCoupon])

  return <CouponCampaignEditor editing campaignUtils={campaignUtils} />
}
