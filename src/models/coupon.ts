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
  expireDate?: moment.Moment | null
  couponCount?: number
  minimumShoppingValue?: number
  tags?: []
  mode?: CouponMode
  state?: CouponState
  isActive?: boolean
  comments?: CouponComment[]
  showCount?: number
  clickCount?: number
  claimCount?: number
  predefinedCodesFileId?: string | null
  createdBy?: string | null
  createdDate?: moment.Moment
  modifiedBy?: string | null
  modifiedDate?: moment.Moment
  approvedBy?: string | null
  approvedDate?: moment.Moment
  smallPictureId?: string | null
  bigPictureId?: string | null
  onlineClaimLink?: string | null
  link?: string | null
  drawDate?: moment.Moment
  prizeRulesFileId?: string | null
  itemPrice?: number
  previousYearAverageBasketValue?: number
  awardedCampaign?: boolean
  partnerId?: number
  partnerName?: string | null
  isPartnerActive?: boolean
  preferredPosition?: number
  discardCount?: number
}
