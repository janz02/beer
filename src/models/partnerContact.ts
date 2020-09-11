import { Roles } from 'api2/swagger/coupon'

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
