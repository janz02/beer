import { logout } from 'features/auth/authSlice'
import { config, api } from 'api'
import JwtDecode from 'jwt-decode'
import { store } from 'app/store'

let tokenPromise: Promise<void> | null

// This must be called after the store is ready because this depends on it.
export const configApiMiddleware = (): void => {
  config.middleware.push(
    {
      pre: async ctx => {
        if (!tokenPromise && !ctx.url.endsWith('Auth/Refresh') && sessionStorage.getItem('jwt')) {
          const jwtExpiration = sessionStorage.getItem('jwtExpiration')
          if (jwtExpiration && +jwtExpiration < new Date().getTime()) {
            let refreshToken = sessionStorage.getItem('refreshToken')
            if (refreshToken) {
              tokenPromise = new Promise(resolve => {
                api.auth
                  .refresh({ refreshDto: { refreshToken: refreshToken } })
                  .then(user => {
                    const jwt = user.jwtToken
                    refreshToken = user.refreshToken || ''
                    const decodedJwt: any = jwt && JwtDecode(jwt)
                    const jwtExpiration = decodedJwt?.exp

                    jwt && sessionStorage.setItem('jwt', jwt)
                    refreshToken && sessionStorage.setItem('refreshToken', refreshToken)
                    // Also correcting precision.
                    jwtExpiration && sessionStorage.setItem('jwtExpiration', `${jwtExpiration}000`)
                    resolve()
                    tokenPromise = null
                  })
                  .catch(() => {
                    store.dispatch(logout())
                  })
              })
            }
          }
        }

        return tokenPromise || Promise.resolve()
      }
    },
    {
      pre: async ctx => {
        ctx.init.headers = {
          ...ctx.init.headers,
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
        }

        return Promise.resolve()
      }
    }
  )
}
