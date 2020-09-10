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
  NotificationsApi,
  NotificationHubApi,
  UserCouponsApi,
  WalletApi,
  InformationApi
} from './coupon-api/apis'
import { couponApiConfig } from './apiConfig'

export const couponApi = {
  coupons: new CouponsApi(couponApiConfig),
  tags: new TagsApi(couponApiConfig),
  couponComments: new CouponCommentsApi(couponApiConfig),
  categories: new CategoriesApi(couponApiConfig),
  auth: new AuthApi(couponApiConfig),
  sites: new SitesApi(couponApiConfig),
  partner: new PartnersApi(couponApiConfig),
  partnerContacts: new PartnerContactsApi(couponApiConfig),
  emailSender: new EmailSenderApi(couponApiConfig),
  emailTemplates: new EmailTemplatesApi(couponApiConfig),
  segments: new SegmentsApi(couponApiConfig),
  cashiers: new CashiersApi(couponApiConfig),
  information: new InformationApi(couponApiConfig),
  files: new FilesApi(couponApiConfig),
  notification: new NotificationsApi(couponApiConfig),
  notificationHub: new NotificationHubApi(couponApiConfig),
  UserCoupons: new UserCouponsApi(couponApiConfig),
  Wallet: new WalletApi(couponApiConfig)
}
