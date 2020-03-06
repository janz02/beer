import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { history } from '../router/router'
import { routerHistoryStore } from '../router/routerHistoryStore'
import { userAccessListReducer } from 'features/userAccess/userAccessListSlice'
import { newsletterEditorReducer } from 'features/newsletter/newsletter-editor/newsletterEditorSlice'
import { authReducer } from 'features/auth/authSlice'
import { couponListReducer } from 'features/coupons/couponList/couponListSlice'
import { couponEditorReducer } from 'features/coupons/couponEditor/couponEditorSlice'
import { couponViewReducer } from 'features/coupons/couponView/couponViewSlice'
import { couponCreateReducer } from 'features/coupons/couponCreate/couponCreateSlice'
import { couponsReducer } from 'features/coupons/couponsSlice'
import { categoryListReducer } from 'features/coupon-category/categoryList/categoryListSlice'
import { categoryEditorReducer } from 'features/coupon-category/categoryEditor/categoryEditorSlice'
import { notificationReducer } from 'features/notification/notificationSlice'
import { partnerReducer } from 'features/partner/partnerSlice'
import { profileReducer } from 'features/profile/profileSlice'
import { siteListReducer } from 'features/sites/siteList/siteListSlice'
import { siteEditorReducer } from 'features/sites/siteEditor/siteEditorSlice'
import { newsletterListReducer } from 'features/newsletter/newsletter-list/newsletterListSlice'

export const rootReducer = combineReducers({
  router: connectRouter(history),
  routerHistory: routerHistoryStore,
  auth: authReducer,
  couponList: couponListReducer,
  couponEditor: couponEditorReducer,
  couponView: couponViewReducer,
  couponCreate: couponCreateReducer,
  coupons: couponsReducer,
  categoryList: categoryListReducer,
  categoryEditor: categoryEditorReducer,
  notification: notificationReducer,
  partner: partnerReducer,
  profile: profileReducer,
  siteList: siteListReducer,
  siteEditor: siteEditorReducer,
  newsletterList: newsletterListReducer,
  newsletterEditor: newsletterEditorReducer,
  userAccessList: userAccessListReducer
})

export type RootState = ReturnType<typeof rootReducer>
