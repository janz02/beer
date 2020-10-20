import moment from 'moment'
import {
  CouponRank,
  CouponType,
  CouponState,
  CouponDiscountType,
  CouponMode
} from 'api/swagger/coupon'
import { CouponComment } from './couponComment'
import { FrontendFileValue } from 'components/upload/fileUploadHelper'

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
  predefinedCodesFile?: FrontendFileValue
  createdBy?: string | null
  createdDate?: moment.Moment
  modifiedBy?: string | null
  modifiedDate?: moment.Moment
  approvedBy?: string | null
  approvedDate?: moment.Moment
  smallPictureId?: string | null
  smallPicture?: FrontendFileValue
  bigPictureId?: string | null
  bigPicture?: FrontendFileValue
  onlineClaimLink?: string | null
  productDetails?: string | null
  drawDate?: moment.Moment
  prizeRulesFileId?: string | null
  prizeRulesFile?: FrontendFileValue
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
