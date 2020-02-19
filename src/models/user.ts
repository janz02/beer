export enum Role {
  PARTNER = 'Partner',
  ADMIN = 'Admin'
}

export interface UserData {
  email?: string
  roles?: Role[]
  exp?: number
}
