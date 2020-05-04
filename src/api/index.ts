import { displayBackendError } from '../services/errorHelpers'
import { InformationApi } from './swagger/apis/InformationApi'
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
  EmailSenderApi,
  EmailTemplatesApi,
  SegmentsApi,
  CashiersApi,
  FilesApi,
  CouponUserCodesApi,
  NotificationsApi,
  NotificationHubApi
} from './swagger/apis'

import { notification } from 'antd'
import i18n from 'app/i18n'

export interface RequestError {
  code?: number
  errors?: RequestErrorItem[]
  guid?: string | null
  stacktrace?: string | null
}

interface RequestErrorItem {
  errorkey?: string | null
  message?: string | null
}

export function getUrl(): string {
  const getUrl = window.location
  return getUrl.protocol + '//' + getUrl.host
}

export const config: Configuration = new Configuration({
  basePath: process.env.REACT_APP_API_URL || getUrl(),
  apiKey: () => `Bearer ${sessionStorage.getItem('jwt')}`,
  middleware: [
    {
      post: async ctx => {
        if (ctx.response.status === 503) {
          notification.error({
            message: i18n.t('error.common.server-unavailable'),
            duration: null
          })
          console.error(i18n.t('error.common.server-unavailable'))
          console.table(ctx.response)
        }
        // In case of the refresh endpoint don't display errors.
        else if (ctx.response.status >= 400 && !ctx.url.endsWith('Auth/Refresh')) {
          const error: RequestError = await ctx.response.json()
          displayBackendError(error, ctx.url)
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
  couponUserCodes: new CouponUserCodesApi(config),
  categories: new CategoriesApi(config),
  auth: new AuthApi(config),
  sites: new SitesApi(config),
  partner: new PartnersApi(config),
  partnerContacts: new PartnerContactsApi(config),
  emailSender: new EmailSenderApi(config),
  emailTemplates: new EmailTemplatesApi(config),
  segments: new SegmentsApi(config),
  cashiers: new CashiersApi(config),
  information: new InformationApi(config),
  files: new FilesApi(config),
  notification: new NotificationsApi(config),
  notificationHub: new NotificationHubApi(config)
}
