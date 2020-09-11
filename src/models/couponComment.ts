import { CouponState } from 'api/coupon-api/models'
import moment from 'moment'

export interface CouponComment {
  id?: number
  couponId?: number
  comment?: string | null
  from?: string | null
  dateTime?: moment.Moment
  stateFrom?: CouponState
  stateTo?: CouponState
}
