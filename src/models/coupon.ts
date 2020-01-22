import moment from 'moment'
import { CouponRank, CouponType } from 'api/swagger/models'

// TODO: use swagger type.
export enum CouponState {
  Created = 'Created',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Waiting = 'Waiting',
  Closed = 'Closed',
  Archived = 'Archived'
}

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
  couponState?: CouponState
  comments?: string[]
}
