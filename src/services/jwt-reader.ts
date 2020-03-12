import JwtDecode from 'jwt-decode'
import { UserData } from 'models/user'
import { Roles } from 'api/swagger/models'

const ROLE_KEY = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

const formatRoles = (jwt: any): Roles[] => {
  const rawRoles = jwt?.[ROLE_KEY]
  return rawRoles ? [].concat(rawRoles) : []
}

export const getJwtUserdata = (token?: string[] | string | null): UserData => {
  const jwt: any = token ?? sessionStorage.getItem('jwt')
  const decodedJwt: any = jwt && JwtDecode(jwt)
  const user: UserData = {
    email: decodedJwt?.email,
    roles: formatRoles(decodedJwt),
    exp: decodedJwt?.exp
  }
  return user
}

export const hasPermission = (roles?: Roles[]): boolean => {
  if (!roles || !roles.length) {
    return true
  }
  const jwtRoles = getJwtUserdata().roles ?? []
  return roles.every(x => jwtRoles.includes(x))
}
