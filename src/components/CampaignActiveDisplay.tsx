import React from 'react'
import { useTranslation } from 'react-i18next'
import { Coupon } from 'models/coupon'

interface CampaignActiveDisplayProps {
  coupon?: Coupon
}

export const CampaignActiveDisplay: React.FC<CampaignActiveDisplayProps> = props => {
  const { coupon } = props
  const { t } = useTranslation()

  const activeLabel = coupon?.isPartnerActive ? coupon?.isActive : false

  return <>{t(`coupon.status.${activeLabel ? 'active' : 'inactive'}`)}</>
}
