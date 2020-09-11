import {
  PartnerContactVm,
  SiteVm,
  PartnerRegistrationState,
  PartnerState
} from 'api2/swagger/coupon'

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
