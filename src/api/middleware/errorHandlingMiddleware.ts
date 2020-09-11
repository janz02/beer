import { Middleware } from '../swagger/coupon'
import { notification } from 'antd'
import i18n from 'app/i18n'
import { displayBackendError } from '../../services/errorHelpers'

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

export const errorHandlingMiddleware: Middleware[] = [
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
