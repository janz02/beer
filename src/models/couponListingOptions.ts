import { OrderByType, CouponState } from 'api/swagger/models'

export interface CouponListingOptions {
  pageSize?: number
  current?: number
  name?: string
  categoryId?: number
  state?: CouponState
  description?: string
  orderBy?: string
  orderByType?: OrderByType
}
