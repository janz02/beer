import { PartnerContactVm, SiteVm, PartnerRegistrationState } from 'api/coupon-api'
import { PartnerState } from 'api/coupon-api/models/PartnerState'

export interface Partner {
  id?: number
  name?: string | null
  address?: string | null
  mailingAddress?: string | null
  registrationNumber?: string | null
  registrationAllowed?: string | null
  taxNumber?: string | null
  bankAccount?: string | null
  registerCode?: string | null
  majorPartner?: boolean
  partnerState?: PartnerState
  partnerRegistrationState?: PartnerRegistrationState
  contacts?: Array<PartnerContactVm> | null
  sites?: Array<SiteVm> | null
}
