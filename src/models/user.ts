export enum Role {
  PARTNER = 'Partner',
  ADMIN = 'Admin'
}
export interface UserData {
  userName?: string
  email?: string
  roles?: Role[]
  partnerId?: number
  partnerContactId?: number
}
