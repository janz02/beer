import React, { useEffect, FC } from 'react'
import { CampaignEditor } from './components/CampaignEditor'
import { useCampaign } from './useCampaign'

export const CampaignEditorPage: FC = () => {
  const campaign = useCampaign()
  const { getCoupon } = campaign

  useEffect(() => getCoupon(), [getCoupon])

  return <CampaignEditor editing campaign={campaign} />
}
