import { logout } from 'features/auth/authSlice'
import JwtDecode from 'jwt-decode'
import { store } from 'app/store'
import { api } from 'api'
import { couponConfig, filesConfig } from '../index'

let tokenPromise: Promise<void> | null
let tokenPromiseResolver: (value?: void | PromiseLike<void>) => void

// This must be called after the store is ready because this depends on it.
export const tokenConfigMiddleware = [
  {
    pre: async (ctx: any) => {
      const refreshRequest = ctx.url.endsWith('Auth/Refresh')
      let refreshToken = sessionStorage.getItem('refreshToken')
      const jwtExpiration = sessionStorage.getItem('jwtExpiration')
      const jwt = sessionStorage.getItem('jwt')

      if (
        tokenPromise ||
        refreshRequest ||
        !jwt ||
        !jwtExpiration ||
        !refreshToken ||
        +jwtExpiration >= new Date().getTime()
      ) {
        return tokenPromise && !refreshRequest ? tokenPromise : Promise.resolve()
      }

      try {
        tokenPromise = new Promise(resolve => {
          tokenPromiseResolver = resolve
        })
        const user = await api.coupon.auth.refresh({ refreshDto: { refreshToken: refreshToken } })
        const jwt = user.jwtToken
        refreshToken = user.refreshToken || ''
        const decodedJwt: any = jwt && JwtDecode(jwt)
        const jwtExpiration = decodedJwt?.exp

        jwt && sessionStorage.setItem('jwt', jwt)
        refreshToken && sessionStorage.setItem('refreshToken', refreshToken)
        // Also correcting precision.
        jwtExpiration && sessionStorage.setItem('jwtExpiration', `${jwtExpiration}000`)

        tokenPromiseResolver()
        tokenPromise = null
      } catch (error) {
        tokenPromise = null
        store.dispatch(logout())
      }

      return tokenPromise && !refreshRequest ? tokenPromise : Promise.resolve()
    }
  },
  {
    pre: async (ctx: any) => {
      ctx.init.headers = {
        ...ctx.init.headers,
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      }

      return Promise.resolve()
    }
  }
]

export const configApiMiddleware = (): void => {
  couponConfig.middleware.push(...tokenConfigMiddleware)
  filesConfig.middleware.push(...tokenConfigMiddleware)
  // campaignEditorConfig.middleware.push(...tokenConfigMiddleware)
}
