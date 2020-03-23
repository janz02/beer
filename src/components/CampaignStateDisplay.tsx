import React from 'react'
import { Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import { CouponState } from 'api/swagger/models'

interface CampaignStateDisplayProps {
  state?: CouponState
}

export const CampaignStateDisplay: React.FC<CampaignStateDisplayProps> = props => {
  const { state } = props
  const { t } = useTranslation()

  if (!state) return <></>

  let color = 'magenta'

  switch (state) {
    case CouponState.Created:
      color = 'magenta'
      break
    case CouponState.Waiting:
      color = 'red'
      break
    case CouponState.Accepted:
      color = 'volcano'
      break
    case CouponState.Closed:
      color = 'orange'
      break
    case CouponState.Archived:
      color = 'gold'
      break
  }

  return <Tag color={color}>{t(`coupon.state.${state.toLowerCase()}`)}</Tag>
}
