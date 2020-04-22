import React, { useEffect, FC } from 'react'
import { CampaignEditor } from './components/CampaignEditor'
import { useCampaign } from './useCampaign'

export const CampaignViewPage: FC = () => {
  const { getCoupon } = useCampaign()

  useEffect(() => getCoupon(), [getCoupon])

  return <CampaignEditor editing={false} />
}
