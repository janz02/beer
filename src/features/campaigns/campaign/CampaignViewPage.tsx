import React, { useEffect, FC } from 'react'
import { CampaignEditorForm } from './CampaignEditorForm'
import { useCampaign } from './useCampaign'

export const CampaignViewPage: FC = () => {
  const { getCoupon } = useCampaign()

  useEffect(() => getCoupon(), [getCoupon])

  return <CampaignEditorForm editing={false} />
}
