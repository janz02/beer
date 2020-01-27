export enum Role {
  PARTNER = 'partner',
  NKM = 'nkm'
}
export interface UserData {
  userName?: string
  roles?: Role[]
  partnerId?: number
}
