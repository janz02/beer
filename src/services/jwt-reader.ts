import JwtDecode from 'jwt-decode'
import { UserData } from 'models/user'

export enum Role {
  PARTNER = 'partner'
}

export const getJwtUserdata = (token?: string): UserData => {
  const jwt = token ?? sessionStorage.getItem('jwt')
  const decodedJwt: any = jwt && JwtDecode(jwt)
  const user: UserData = {
    userName: decodedJwt?.sub ?? '',
    roles: decodedJwt?.roles ?? [Role.PARTNER]
  }
  return user
}

export const hasPermission = (roles?: Role[]): boolean => {
  if (!roles || roles.length < 1) {
    return true
  }
  const jwtRoles = getJwtUserdata().roles ?? []
  if (jwtRoles.length > 0) {
    for (const role of roles) {
      if (jwtRoles.indexOf(role) >= 0) {
        return true
      }
    }
  }
  return false
}
