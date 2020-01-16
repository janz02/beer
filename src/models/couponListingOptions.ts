import { OrderByType } from 'api/swagger/models'

export interface CouponListingOptions {
  pageSize?: number
  current?: number
  name?: string
  description?: string
  orderBy?: string
  orderByType?: OrderByType
}
