import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CouponCampaign } from 'models/couponCampaign'

export const isCouponActive = (coupon: CouponCampaign): boolean =>
  !!(coupon.isPartnerActive && coupon.isActive)

interface CouponCampaignActiveDisplayProps {
  coupon?: CouponCampaign
}

export const CouponCampaignActiveDisplay: FC<CouponCampaignActiveDisplayProps> = props => {
  const { coupon } = props
  const { t } = useTranslation()

  if (!coupon) return <></>
  return <>{t(`coupon.status.${isCouponActive(coupon) ? 'active' : 'inactive'}`)}</>
}
