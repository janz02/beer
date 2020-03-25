import moment from 'moment'
import {
  CouponRank,
  CouponType,
  CouponState,
  CouponDiscountType,
  CouponMode
} from 'api/swagger/models'
import { CouponComment } from './couponComment'

export interface Coupon {
  id?: number
  name?: string | null
  description?: string | null
  rank?: CouponRank
  categoryId?: number
  type?: CouponType
  discountType?: CouponDiscountType
  discountValue?: number | null
  startDate?: moment.Moment
  endDate?: moment.Moment
  expireDate?: moment.Moment
  couponCount?: number
  minimumShoppingValue?: number
  tags?: []
  isDrawable?: boolean
  state?: CouponState
  isActive?: boolean
  comments?: CouponComment[]
  predefinedCodesFileId?: string | null
  createdBy?: string | null
  createdDate?: moment.Moment
  modifiedBy?: string | null
  modifiedDate?: moment.Moment
  approvedBy?: string | null
  approvedDate?: moment.Moment
  smallPicture?: string | null
  bigPicture?: string | null
  onlineClaimLink?: string | null
  link?: string | null
  drawDate?: moment.Moment
  prizeRulesFileId?: string | null
  itemPrice?: number
  previousYearAverageBasketValue?: number
  awardedCampaign?: boolean
  mode?: CouponMode
  partnerId?: number
}
