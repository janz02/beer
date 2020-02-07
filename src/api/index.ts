import { PartnerContactsApi } from './swagger/apis/PartnerContactsApi'
import { CouponCommentsApi } from './swagger/apis/CouponCommentsApi'
import { Configuration } from './swagger/runtime'
import { CouponsApi, CategoriesApi, AuthApi, SitesApi, PartnersApi, TagsApi } from './swagger/apis'
import { notification } from 'antd'
import i18n from 'app/i18n'
import JwtDecode from 'jwt-decode'

interface RequestError {
  Code?: number
  ErrorKey?: string
  Message?: string
  Guid?: string
  StackTrace?: string
}

const getUrl = window.location
const baseUrl = getUrl.protocol + '//' + getUrl.host + '/' + getUrl.pathname.split('/')[1]
let tokenPromise: Promise<void> | null

const config: Configuration = new Configuration({
  basePath: process.env.REACT_APP_API_URL || baseUrl,
  apiKey: () => `Bearer ${sessionStorage.getItem('jwt')}`,
  middleware: [
    {
      post: ctx => {
        // TODO: handle 503 like the rest of errors? (Currently it doesn't return json.)
        if (ctx.response.status === 503) {
          notification.error({
            message: 'The server is currently unavailable',
            duration: null
          })
          console.error('The server is currently unavailable')
          console.table(ctx.response)
        } else if (ctx.response.status >= 400) {
          ctx.response.json().then((x: RequestError) => {
            notification.error({
              message: x.ErrorKey ? i18n.t(x.ErrorKey) : x.Message,
              description: x.Guid,
              duration: null
            })
            console.table({ ...x, url: ctx.url })
          })
        }

        return Promise.resolve()
      }
    }
  ]
})

export const api = {
  coupons: new CouponsApi(config),
  tags: new TagsApi(config),
  couponComments: new CouponCommentsApi(config),
  categories: new CategoriesApi(config),
  auth: new AuthApi(config),
  sites: new SitesApi(config),
  partner: new PartnersApi(config),
  partnerContacts: new PartnerContactsApi(config)
}

config.middleware.push(
  {
    pre: async ctx => {
      if (!tokenPromise && !ctx.url.endsWith('Auth/Refresh') && sessionStorage.getItem('jwt')) {
        const jwtExpiration = sessionStorage.getItem('jwtExpiration')
        if (jwtExpiration && +jwtExpiration < new Date().getTime()) {
          let refreshToken = sessionStorage.getItem('refreshToken')
          if (refreshToken) {
            tokenPromise = new Promise(resolve => {
              api.auth.refresh({ refreshDto: { refreshToken: refreshToken } }).then(user => {
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
