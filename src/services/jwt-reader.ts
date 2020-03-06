import JwtDecode from 'jwt-decode'
import { UserData } from 'models/user'
import { Roles } from 'api/swagger/models'

export const getJwtUserdata = (token?: string | null): UserData => {
  const jwt = token ?? sessionStorage.getItem('jwt')
  const decodedJwt: any = jwt && JwtDecode(jwt)

  const user: UserData = {
    email: decodedJwt?.email,
    roles: decodedJwt?.roles,
    exp: decodedJwt?.exp
  }
  return user
}

export const hasPermission = (roles?: Roles): boolean => {
  if (!roles) return true
  return !roles || roles === getJwtUserdata().roles
}
