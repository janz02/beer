import React, { useEffect, FC } from 'react'
import { CampaignEditor } from './components/CampaignEditor'
import { useCampaignUtils } from './useCampaignUtils'

export const CampaignEditorPage: FC = () => {
  const campaignUtils = useCampaignUtils()
  const { getCoupon } = campaignUtils

  useEffect(() => getCoupon(), [getCoupon])

  return <CampaignEditor editing campaignUtils={campaignUtils} />
}
