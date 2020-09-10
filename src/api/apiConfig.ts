import { RequestError } from './errorContract'
import { getUrl } from 'services/baseUrlHelper'
import { Configuration as CouponApiConfiguration } from './coupon-api'
import { Configuration as CampaignEditorApiConfiguration } from './campaign-editor-api'
import { notification } from 'antd'
import i18n from 'app/i18n'
import { displayBackendError } from '../services/errorHelpers'

const errorHandlerMiddleware = {
  post: async (ctx: any) => {
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

const baseUrl = getUrl()

export const couponApiConfig: CouponApiConfiguration = new CouponApiConfiguration({
  basePath: baseUrl,
  middleware: [errorHandlerMiddleware]
})

export const campaignApiConfig: CampaignEditorApiConfiguration = new CampaignEditorApiConfiguration(
  {
    basePath: baseUrl,
    middleware: [errorHandlerMiddleware]
  }
)
