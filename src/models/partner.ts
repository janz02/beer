import { PartnerContactVm, SiteVm } from 'api/swagger'
import { PartnerState } from 'api/swagger/models/PartnerState'

export interface Partner {
  id?: number
  name?: string | null
  address?: string | null
  registrationNumber?: number
  taxNumber?: number
  bankAccount?: number
  registerCode?: string | null
  majorPartner?: boolean
  partnerState?: PartnerState
  contacts?: Array<PartnerContactVm> | null
  sites?: Array<SiteVm> | null
}
