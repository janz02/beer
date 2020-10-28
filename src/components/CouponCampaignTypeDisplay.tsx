import React, { FC, FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { CouponType } from 'api/swagger/coupon'
import { Tooltip } from 'antd'
import Icon from '@ant-design/icons'
import { ReactComponent as DiscountIcon } from 'assets/img/ic_type_discount.svg'
import { ReactComponent as PrizeIcon } from 'assets/img/ic_type_prize.svg'
import { ReactComponent as BannerIcon } from 'assets/img/ic_type_banner.svg'

interface CouponCampaignTypeDisplayProps {
  type?: CouponType
}

export const CouponCampaignTypeDisplay: FC<CouponCampaignTypeDisplayProps> = props => {
  const { type } = props
  const { t } = useTranslation()

  if (!type) return <></>

  let icon: FunctionComponent
  let tooltip: string

  switch (type) {
    case CouponType.Banner: {
      tooltip = t('coupon.type.banner')
      icon = BannerIcon
      break
    }
    case CouponType.Discount: {
      tooltip = t('coupon.type.discount')
      icon = DiscountIcon
      break
    }
    case CouponType.Prize: {
      tooltip = t('coupon.type.prize')
      icon = PrizeIcon
      break
    }
    default:
      return <></>
  }

  return (
    <Tooltip placement="left" title={tooltip}>
      <Icon component={icon} />
    </Tooltip>
  )
}
