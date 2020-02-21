import { Configuration } from './swagger/runtime'
import {
  CouponsApi,
  CategoriesApi,
  AuthApi,
  SitesApi,
  PartnersApi,
  TagsApi,
  CouponCommentsApi,
  PartnerContactsApi,
  ApiKeysApi
} from './swagger/apis'
import { notification } from 'antd'
import i18n from 'app/i18n'

interface RequestError {
  Code?: number
  ErrorKey?: string
  Message?: string
  Guid?: string
  StackTrace?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getUrl() {
  const getUrl = window.location
  return getUrl.protocol + '//' + getUrl.host
}

export const config: Configuration = new Configuration({
  basePath: process.env.REACT_APP_API_URL || getUrl(),
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
  partnerContacts: new PartnerContactsApi(config),
  apiKey: new ApiKeysApi(config)
}
