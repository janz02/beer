import { CouponCommentsApi } from './swagger/apis/CouponCommentsApi'
import { Configuration } from './swagger/runtime'
import { CouponsApi, CategoriesApi, AuthApi, SitesApi, PartnersApi, TagsApi } from './swagger/apis'
import { notification } from 'antd'
import i18n from 'app/i18n'

interface RequestError {
  Code?: number
  ErrorKey?: string
  Message?: string
  Guid?: string
  StackTrace?: string
}

const config: Configuration = new Configuration({
  basePath: process.env.REACT_APP_API_URL,
  apiKey: () => `Bearer ${sessionStorage.getItem('jwt')}`,
  middleware: [
    {
      post: ctx => {
        if (ctx.response.status >= 400) {
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
  partner: new PartnersApi(config)
}
