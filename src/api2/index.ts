import {
  CouponsApi,
  TagsApi,
  CouponCommentsApi,
  CategoriesApi,
  AuthApi,
  SitesApi,
  PartnersApi,
  PartnerContactsApi,
  EmailSenderApi,
  EmailTemplatesApi,
  SegmentsApi,
  CashiersApi,
  InformationApi,
  FilesApi,
  NotificationsApi,
  NotificationHubApi,
  UserCouponsApi,
  WalletApi
} from './swagger/coupon'
import { Middleware } from './swagger/coupon/runtime'
import * as fromCoupon from './swagger/coupon/runtime'
// import * as fromFiles from './swagger/files/runtime'
import { tokenConfigMiddleware } from './middleware/tokenConfigMiddleware'
import { errorHandlingMiddleware } from './middleware/errorHandlingMiddleware'

export function getUrl(): string {
  const getUrl = window.location
  return getUrl.protocol + '//' + getUrl.host
}

// ---- BASE CONFIG
const apiMiddleware: Middleware[] = [...errorHandlingMiddleware, ...tokenConfigMiddleware]

interface ApiBaseConfigProps {
  appendUrl?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const apiBaseConfig = (props?: ApiBaseConfigProps) => ({
  basePath: (process.env.REACT_APP_API_URL || getUrl()) + (props?.appendUrl ?? ''),
  apiKey: () => `Bearer ${sessionStorage.getItem('jwt')}`,
  middleware: apiMiddleware
})

// ---- OTHER CONFIGS
const couponConfig: fromCoupon.Configuration = new fromCoupon.Configuration(apiBaseConfig())

// const filesConfig: fromFiles.Configuration = new fromCoupon.Configuration(apiBaseConfig())

export const api = {
  coupons: new CouponsApi(couponConfig),
  tags: new TagsApi(couponConfig),
  couponComments: new CouponCommentsApi(couponConfig),
  categories: new CategoriesApi(couponConfig),
  auth: new AuthApi(couponConfig),
  sites: new SitesApi(couponConfig),
  partner: new PartnersApi(couponConfig),
  partnerContacts: new PartnerContactsApi(couponConfig),
  emailSender: new EmailSenderApi(couponConfig),
  emailTemplates: new EmailTemplatesApi(couponConfig),
  segments: new SegmentsApi(couponConfig),
  cashiers: new CashiersApi(couponConfig),
  information: new InformationApi(couponConfig),
  files: new FilesApi(couponConfig),
  // files: new FilesApi(filesConfig),
  notification: new NotificationsApi(couponConfig),
  notificationHub: new NotificationHubApi(couponConfig),
  UserCoupons: new UserCouponsApi(couponConfig),
  Wallet: new WalletApi(couponConfig)
}
