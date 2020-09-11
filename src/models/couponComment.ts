import { CouponState } from 'api2/swagger/coupon'
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
