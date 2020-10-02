import React, { FC } from 'react'
import { Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import { CouponState } from 'api/swagger/coupon'
import './CampaignStateDisplay.scss'

interface CampaignStateDisplayProps {
  state?: CouponState
}

export const CampaignStateDisplay: FC<CampaignStateDisplayProps> = props => {
  const { state } = props
  const { t } = useTranslation()

  if (!state) return <></>

  const className = 'campaign-state-' + state.toLowerCase()

  return <Tag className={className}>{t(`coupon.state.${state.toLowerCase()}`)}</Tag>
}
