import JwtDecode from 'jwt-decode'
import { UserData, Role } from 'models/user'

const formatRoles = (rawRules: string): Role[] => {
  return rawRules ? (rawRules.split(';') as Role[]) : []
}

export const getJwtUserdata = (token?: string | null): UserData => {
  const jwt = token ?? sessionStorage.getItem('jwt')
  const decodedJwt: any = jwt && JwtDecode(jwt)

  const user: UserData = {
    userName: decodedJwt?.email ?? '',
    email: decodedJwt?.email ?? '',
    roles: formatRoles(decodedJwt?.roles),
    partnerId: decodedJwt?.partnerId,
    partnerContactId: decodedJwt?.partnerContactId
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
