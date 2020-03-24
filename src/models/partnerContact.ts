import { Roles } from 'api/swagger/models'

export interface PartnerContact {
  id?: number
  name?: string | null
  email?: string | null
  phone?: string | null
  partnerName?: string | null
  role?: Roles | null
  active?: boolean
  majorPartner?: boolean
}
