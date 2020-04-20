import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { history } from '../router/router'
import { routerHistoryStore } from '../router/routerHistoryStore'
import { userAccessListReducer } from 'features/userAccess/userAccessListSlice'
import { newsletterEditorReducer } from 'features/newsletter/newsletter-editor/newsletterEditorSlice'
import { authReducer } from 'features/auth/authSlice'
import { couponListReducer } from 'features/coupons/couponList/couponListSlice'
import { couponsReducer } from 'features/coupons/couponsSlice'
import { notificationReducer } from 'features/notification/notificationSlice'
import { profileReducer } from 'features/profile/profileSlice'
import { siteEditorReducer } from 'features/sites/siteEditor/siteEditorSlice'
import { newsletterListReducer } from 'features/newsletter/newsletter-list/newsletterListSlice'
import { partnersListReducer } from 'features/partners/partnerList/partnerListSlice'
import { selfPartnerReducer } from 'features/partners/selfPartner/selfPartnerSlice'
import { partnerEditorReducer } from 'features/partners/partnerEditor/partnerEditorSlice'
import { partnerSiteListSlice, siteListSlice } from 'features/sites/siteList/siteListSliceFactory'
import {
  partnerContactsSlice,
  contactsSlice
} from 'features/partnerContacts/partnerContactsSliceFactory'
import { categoryListReducer } from 'features/campaignCategory/categoryList/categoryListSlice'
import { categoryEditorReducer } from 'features/campaignCategory/categoryEditor/categoryEditorSlice'

export const rootReducer = combineReducers({
  router: connectRouter(history),
  routerHistory: routerHistoryStore,
  auth: authReducer,
  profile: profileReducer,
  couponList: couponListReducer,
  coupons: couponsReducer,
  categoryList: categoryListReducer,
  categoryEditor: categoryEditorReducer,
  selfPartner: selfPartnerReducer,
  partnerList: partnersListReducer,
  partnerEditor: partnerEditorReducer,
  partnerSiteList: partnerSiteListSlice.reducer,
  partnerContacts: partnerContactsSlice.reducer,
  siteList: siteListSlice.reducer,
  siteEditor: siteEditorReducer,
  contacts: contactsSlice.reducer,
  newsletterList: newsletterListReducer,
  newsletterEditor: newsletterEditorReducer,
  userAccessList: userAccessListReducer,
  notification: notificationReducer
})

export type RootState = ReturnType<typeof rootReducer>
