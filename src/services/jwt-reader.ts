import JwtDecode from 'jwt-decode'
import { UserData } from 'models/user'
import { Roles } from 'api/swagger/models'

const ROLE_KEY = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

const formatRoles = (jwt: any): Roles[] => {
  const rawRoles = jwt?.[ROLE_KEY]
  return rawRoles ? [].concat(rawRoles) : []
}

export const isLoggedIn = (): boolean => {
  return !!sessionStorage.getItem('jwt')
}

export const getJwtUserdata = (token?: string[] | string | null): UserData => {
  const jwt: any = token ?? sessionStorage.getItem('jwt')
  const partnerId = sessionStorage.getItem('partnerId')
  const partnerName = sessionStorage.getItem('partnerName')
  const decodedJwt: any = jwt && JwtDecode(jwt)
  const user: UserData = {
    email: decodedJwt?.email,
    roles: formatRoles(decodedJwt),
    exp: decodedJwt?.exp,
    partnerId: partnerId ? +partnerId : null,
    partnerName: partnerName || null
  }
  return user
}

export const hasAllPermissions = (roles?: Roles[]): boolean => {
  if (!roles || !roles.length) {
    return true
  }
  const jwtRoles = getJwtUserdata().roles ?? []
  return roles.every(x => jwtRoles.includes(x))
}

export const hasPermission = (roles?: Roles[]): boolean => {
  if (!roles || !roles.length) {
    return true
  }
  if (!isLoggedIn()) {
    return false
  }
  const jwtRoles = getJwtUserdata().roles ?? []
  return roles.some(x => jwtRoles.includes(x))
}
