/**
 * *JWT specific helper methods
 */

import JwtDecode from 'jwt-decode'
import { UserData } from 'models/user'
import { Roles } from 'api/coupon-api/models'

const ROLE_KEY = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

/**
 * Extracts the roles from the jwt token
 * @param jwt user jwt token
 */
const formatRoles = (jwt: any): Roles[] => {
  const rawRoles = jwt?.[ROLE_KEY]
  return rawRoles ? [].concat(rawRoles) : []
}

/**
 * Checks whether a user is logged in.
 */
export const isLoggedIn = (): boolean => {
  return !!sessionStorage.getItem('jwt')
}

/**
 * Extracts the jwt token and returns the contained infos (email, roles, expiration, userId etc.).
 * @param {string[] | string | null | undefined} token user jwt token
 */
export const getJwtUserdata = (token?: string[] | string | null): UserData => {
  const jwt: any = token ?? sessionStorage.getItem('jwt')
  const userId = sessionStorage.getItem('userId')
  const partnerId = sessionStorage.getItem('partnerId')
  const partnerName = sessionStorage.getItem('partnerName')
  const decodedJwt: any = jwt && JwtDecode(jwt)
  const user: UserData = {
    email: decodedJwt?.email,
    roles: formatRoles(decodedJwt),
    exp: decodedJwt?.exp,
    id: userId ? +userId : null,
    partnerId: partnerId ? +partnerId : null,
    partnerName: partnerName || null
  }
  return user
}

/**
 * Checks whether the user has(owns) all of the required roles.
 * @param {Roles[] | undefined} roles required roles
 * @param {string | undefined} token user jwt token
 */
export const hasAllPermissions = (roles?: Roles[], token?: string): boolean => {
  if (!roles || !roles.length) {
    return true
  }
  const jwtRoles = getJwtUserdata(token).roles ?? []
  return roles.every(x => jwtRoles.includes(x))
}

/**
 * Checks whether the user has any of the required permissions.
 * @param {Roles[] | undefined} roles required roles
 * @param {string | undefined} token user jwt token
 */
export const hasPermission = (roles?: Roles[], token?: string): boolean => {
  if (!roles || !roles.length) {
    return true
  }
  if (!isLoggedIn()) {
    return false
  }
  const jwtRoles = getJwtUserdata(token).roles ?? []
  return roles.some(x => jwtRoles.includes(x))
}
