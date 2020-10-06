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

const errorDisplayExcludedUrls = ['Auth/Refresh', 'Files/Thumbnail']

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
      } else if (
        ctx.response.status >= 400 &&
        errorDisplayExcludedUrls.every(x => ctx.url.lastIndexOf(x) === -1)
      ) {
        const error: RequestError = await ctx.response.json()
        displayBackendError(error, ctx.url)
      }

      return Promise.resolve()
    }
  }
]
