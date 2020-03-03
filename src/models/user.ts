export enum Role {
  NONE = 'None',
  ADMINISTRATOR = 'Administrator',
  CAMPAIGNMANAGER = 'CampaignManager',
  PARTNERMANAGER = 'PartnerManager',
  BUSINESSPARTNERMANAGER = 'BusinessPartnerManager',
  PARTNERCONTACTAPPROVER = 'PartnerContactApprover',
  PARTNERCONTACTEDITOR = 'PartnerContactEditor',
  USER = 'User'
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface UserData {
  email?: string
  roles?: Role[]
  exp?: number
}

export interface UserAccess {
  id?: number
  name?: string | null
  partnerId?: number
  partnerName?: string | null
  partnerType?: boolean
  email?: number
  phone?: number
  role?: Role | null
  active?: boolean
}
