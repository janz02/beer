import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Coupon } from 'models/coupon'

export const isCouponActive = (coupon: Coupon): boolean =>
  !!(coupon.isPartnerActive && coupon.isActive)

interface CampaignActiveDisplayProps {
  coupon?: Coupon
}

export const CampaignActiveDisplay: FC<CampaignActiveDisplayProps> = props => {
  const { coupon } = props
  const { t } = useTranslation()

  if (!coupon) return <></>
  return <>{t(`coupon.status.${isCouponActive(coupon) ? 'active' : 'inactive'}`)}</>
}
