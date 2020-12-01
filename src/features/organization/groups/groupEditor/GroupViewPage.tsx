import React, { useEffect, FC } from 'react'
import { useGroupEditorUtils } from './useGroupEditorUtils'

export const CouponCampaignViewPage: FC = () => {
  const groupEditorUtils = useGroupEditorUtils()
  const { loadGroup } = groupEditorUtils

  useEffect(() => loadGroup(), [loadGroup])

  return <div /> // <CouponCampaignEditor editing={false} campaignUtils={groupEditorUtils} />
}
