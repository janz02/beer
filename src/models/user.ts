import { Roles } from 'api/coupon-api/models'

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum UserType {
  NKM = 'nkm',
  PARTNER = 'partner'
}

export interface UserData {
  id?: number | null
  email?: string
  roles?: Roles[]
  exp?: number
  partnerId?: number | null
  partnerName?: string | null
}

export interface UserAccess {
  id?: number
  name?: string | null
  partnerId?: number
  partnerName?: string | null
  email?: string | null
  phone?: string | null
  role?: Roles | null
  isActive?: boolean
}
