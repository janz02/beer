import React, { FC } from 'react'
import { Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import { CouponState } from 'api/swagger/coupon'

interface CampaignStateDisplayProps {
  state?: CouponState
}

export const CampaignStateDisplay: FC<CampaignStateDisplayProps> = props => {
  const { state } = props
  const { t } = useTranslation()

  if (!state) return <></>

  let color = 'orange'

  switch (state) {
    case CouponState.Created:
      color = 'orange'
      break
    case CouponState.Waiting:
      color = 'green'
      break
    case CouponState.Accepted:
      color = 'cyan'
      break
    case CouponState.Closed:
      color = 'geekblue'
      break
    case CouponState.Archived:
      color = 'default'
      break
  }

  return <Tag color={color}>{t(`coupon.state.${state.toLowerCase()}`)}</Tag>
}
