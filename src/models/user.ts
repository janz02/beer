import { Role } from 'services/jwt-reader'

export interface UserData {
  userName?: string
  roles?: Role[]
}
