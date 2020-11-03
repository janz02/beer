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
  SystemParametersApi
} from '../api/swagger/coupon'
import {
  CampaignsApi,
  PermissionsApi,
  ProductsApi,
  SegmentationQueriesApi,
  SegmentationCategoriesApi,
  SegmentationsApi,
  TemplatesApi,
  TestGroupCategoriesApi,
  CampaignResultsApi,
  AccountsApi,
  StaticMergeTagsApi
} from './swagger/campaign-editor'
import { FilesApi, InformationApi as InformationFilesMsApi } from '../api/swagger/files'
import { errorHandlingMiddleware } from './middleware'
import { Middleware, Configuration as CouponConfiguration } from '../api/swagger/coupon/runtime'
import { Configuration as CampaignEditorConfiguration } from './swagger/campaign-editor/runtime'
import { Configuration as FilesConfiguration } from '../api/swagger/files/runtime'
import { Configuration as AdminConfiguration } from '../api/swagger/admin/runtime'
import { getUrl } from 'services/baseUrlHelper'
import { CompaniesApi, TransactionApi } from './swagger/admin'

// ---- BASE CONFIG
const apiMiddleware: Middleware[] = [...errorHandlingMiddleware]

interface ApiBaseConfigProps {
  appendUrl?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const apiBaseConfig = (props?: ApiBaseConfigProps) => ({
  // basePath: (process.env.REACT_APP_API_URL || getUrl()) + (props?.appendUrl ?? ''), // would be this one with same origin for apis
  basePath: getUrl(props?.appendUrl), // todo: update to above when apis are available from same origin
  apiKey: () => `Bearer ${sessionStorage.getItem('jwt')}`,
  middleware: apiMiddleware
})

// ---- OTHER CONFIGS
// todo update appendUrl props when apis are available from same origin
export const adminConfig: AdminConfiguration = new AdminConfiguration(
  apiBaseConfig({
    appendUrl: process.env.REACT_APP_ADMIN_API_URL
  })
)

export const couponConfig: CouponConfiguration = new CouponConfiguration(
  apiBaseConfig({ appendUrl: process.env.REACT_APP_COUPON_API_URL })
)

export const campaignEditorConfig: CampaignEditorConfiguration = new CampaignEditorConfiguration(
  apiBaseConfig({ appendUrl: process.env.REACT_APP_CAMPAIGNEDITOR_API_URL })
)

export const filesConfig: FilesConfiguration = new FilesConfiguration(
  apiBaseConfig({ appendUrl: process.env.REACT_APP_FILES_API_URL })
)

export const api = {
  admin: {
    companies: new CompaniesApi(adminConfig),
    transaction: new TransactionApi(adminConfig)
  },
  coupon: {
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
    notification: new NotificationsApi(couponConfig),
    notificationHub: new NotificationHubApi(couponConfig),
    userCoupons: new UserCouponsApi(couponConfig),
    wallet: new WalletApi(couponConfig),
    systemParameters: new SystemParametersApi(couponConfig)
  },
  files: {
    files: new FilesApi(filesConfig),
    information: new InformationFilesMsApi(filesConfig)
  },
  campaignEditor: {
    accounts: new AccountsApi(campaignEditorConfig),
    campaigns: new CampaignsApi(campaignEditorConfig),
    campaignResults: new CampaignResultsApi(campaignEditorConfig),
    permissions: new PermissionsApi(campaignEditorConfig),
    products: new ProductsApi(campaignEditorConfig),
    segmentationCategories: new SegmentationCategoriesApi(campaignEditorConfig),
    segmentationQueries: new SegmentationQueriesApi(campaignEditorConfig),
    segmentations: new SegmentationsApi(campaignEditorConfig),
    staticMergeTags: new StaticMergeTagsApi(campaignEditorConfig),
    templates: new TemplatesApi(campaignEditorConfig),
    testGroupCategories: new TestGroupCategoriesApi(campaignEditorConfig)
  }
}
