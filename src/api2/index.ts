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
  NotificationsApi,
  NotificationHubApi,
  UserCouponsApi,
  WalletApi,
  FilesApi
} from './swagger/coupon'
import {
  CampaignsApi,
  PermissionsApi,
  ProductsApi,
  SegmentationQueriesApi,
  SegmentationCategoriesApi,
  SegmentationsApi,
  SharepointApi,
  TemplatesApi,
  TestGroupCategoriesApi
} from './swagger/campaign-editor'
import { FilesApi as FilesMsApi } from './swagger/files'
import { errorHandlingMiddleware, tokenConfigMiddleware } from './middleware'
import { Middleware, Configuration as CouponConfiguration } from './swagger/coupon/runtime'
import { Configuration as CampaignEditorConfiguration } from './swagger/campaign-editor/runtime'
import { Configuration as FilesConfiguration } from './swagger/files/runtime'

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
  // basePath: (process.env.REACT_APP_API_URL || getUrl()) + (props?.appendUrl ?? ''), // would be this one with same origin for apis
  basePath: props?.appendUrl ?? '', // todo: update to above when apis are available from same origin
  apiKey: () => `Bearer ${sessionStorage.getItem('jwt')}`,
  middleware: apiMiddleware
})

// ---- OTHER CONFIGS
// todo update appendUrl props when apis are available from same origin
const couponConfig: CouponConfiguration = new CouponConfiguration(
  apiBaseConfig({ appendUrl: process.env.REACT_APP_COUPON_API_URL })
)

const campaignEditorConfig: CampaignEditorConfiguration = new CampaignEditorConfiguration(
  apiBaseConfig({ appendUrl: process.env.REACT_APP_CAMPAIGNEDITOR_API_URL })
)

const filesConfig: FilesConfiguration = new FilesConfiguration(
  apiBaseConfig({ appendUrl: process.env.REACT_APP_FILES_API_URL })
)

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
  filesMS: new FilesMsApi(filesConfig),
  notification: new NotificationsApi(couponConfig),
  notificationHub: new NotificationHubApi(couponConfig),
  UserCoupons: new UserCouponsApi(couponConfig),
  Wallet: new WalletApi(couponConfig),
  campaigns: new CampaignsApi(campaignEditorConfig),
  permissions: new PermissionsApi(campaignEditorConfig),
  products: new ProductsApi(campaignEditorConfig),
  segmentationCategories: new SegmentationCategoriesApi(campaignEditorConfig),
  segmentationQueries: new SegmentationQueriesApi(campaignEditorConfig),
  segmentations: new SegmentationsApi(campaignEditorConfig),
  sharepoint: new SharepointApi(campaignEditorConfig),
  templates: new TemplatesApi(campaignEditorConfig),
  testGroupCategories: new TestGroupCategoriesApi(campaignEditorConfig)
}
