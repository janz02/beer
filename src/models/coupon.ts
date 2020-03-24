import moment from 'moment'
import { CouponRank, CouponType, CouponState } from 'api/swagger/models'
import { CouponComment } from './couponComment'

export interface Coupon {
  id?: number
  name?: string
  description?: string
  rank?: CouponRank
  categoryId?: number
  type?: CouponType
  discountValue?: number
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
  showCount?: number
  clickCount?: number
  claimCount?: number
  predefinedCodesFileId?: string
}
