import moment from 'moment'
import {
  CouponRank,
  CouponType,
  CouponState,
  CouponDiscountType,
  CouponMode
} from 'api/swagger/coupon'
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
  predefinedCodesFile?: { id: string; extension?: string; size?: number; dimensions?: string }
  createdBy?: string | null
  createdDate?: moment.Moment
  modifiedBy?: string | null
  modifiedDate?: moment.Moment
  approvedBy?: string | null
  approvedDate?: moment.Moment
  smallPictureId?: string | null
  smallPicture?: { id: string; extension?: string; size?: number; dimensions?: string }
  bigPictureId?: string | null
  bigPicture?: { id: string; extension?: string; size?: number; dimensions?: string }
  onlineClaimLink?: string | null
  productDetails?: string | null
  drawDate?: moment.Moment
  prizeRulesFileId?: string | null
  prizeRulesFile?: { id: string; extension?: string; size?: number; dimensions?: string }
  itemPrice?: number | null
  previousYearAverageBasketValue?: number | null
  awardedCampaign?: boolean
  partnerId?: number
  partnerName?: string | null
  isPartnerActive?: boolean
  preferredPosition?: number
  discardCount?: number
  prizeValue?: number | null
}
