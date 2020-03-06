import { Roles } from 'api/swagger/models'

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface UserData {
  email?: string
  roles?: Roles
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
  role?: Roles | null
  active?: boolean
}
