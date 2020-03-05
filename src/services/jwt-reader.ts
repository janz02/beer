import JwtDecode from 'jwt-decode'
import { UserData } from 'models/user'
import { Roles } from 'api/swagger/models'

const formatRoles = (rawRules: string): Roles[] => {
  return rawRules ? (rawRules.split(';') as Roles[]) : []
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

export const hasPermission = (roles?: Roles[]): boolean => {
  if (!roles || !roles.length) {
    return true
  }

  const jwtRoles = getJwtUserdata().roles ?? []
  return roles.every(x => jwtRoles.includes(x))
}
