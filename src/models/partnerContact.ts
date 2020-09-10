import { Roles } from 'api/coupon-api/models'

export interface PartnerContact {
  id?: number
  name?: string | null
  email?: string | null
  phone?: string | null
  partnerName?: string | null
  role?: Roles | null
  isActive?: boolean
  majorPartner?: boolean | null
}
