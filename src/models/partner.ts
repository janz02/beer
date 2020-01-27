import { PartnerContactVm, SiteVm } from 'api/swagger'

export interface Partner {
  id?: number
  name?: string | null
  majorPartner?: boolean
  address?: string
  registrationNumber?: number
  taxNumber?: number
  bankAccount?: number
  contacts?: Array<PartnerContactVm> | null
  sites?: Array<SiteVm> | null
}
