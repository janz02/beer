import JwtDecode from 'jwt-decode'
import { UserData, Role } from 'models/user'

const formatRoles = (rawRules: string): Role[] => {
  return rawRules ? (rawRules.split(';') as Role[]) : []
}

export const getJwtUserdata = (token?: string | null): UserData => {
  const jwt = token ?? sessionStorage.getItem('jwt')
  const decodedJwt: any = jwt && JwtDecode(jwt)

  const user: UserData = {
    email: decodedJwt?.email,
    roles: formatRoles(decodedJwt?.roles),
    exp: decodedJwt?.exp
  }
  return user
}

export const hasPermission = (roles?: Role[]): boolean => {
  if (!roles || !roles.length) {
    return true
  }

  const jwtRoles = getJwtUserdata().roles ?? []
  return roles.every(x => jwtRoles.includes(x))
}
