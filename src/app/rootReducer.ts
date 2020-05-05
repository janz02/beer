import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { history } from '../router/router'
import { routerHistoryStore } from '../router/routerHistoryStore'
import { userAccessListReducer } from 'features/userAccess/userAccessListSlice'
import { newsletterEditorReducer } from 'features/newsletter/newsletter-editor/newsletterEditorSlice'
import { authReducer } from 'features/auth/authSlice'
import { campaignListReducer } from 'features/campaigns/campaignList/campaignListSlice'
import { campaignsReducer } from 'features/campaigns/campaignsSlice'
import { notificationReducer } from 'features/notification/notificationSlice'
import { profileReducer } from 'features/profile/profileSlice'
import { siteEditorReducer } from 'features/sites/siteEditor/siteEditorSlice'
import { newsletterListReducer } from 'features/newsletter/newsletterList/newsletterListSlice'
import { partnersListReducer } from 'features/partners/partnerList/partnerListSlice'
import { selfPartnerReducer } from 'features/partners/selfPartner/selfPartnerSlice'
import { partnerEditorReducer } from 'features/partners/partnerEditor/partnerEditorSlice'
import { partnerSiteListSlice, siteListSlice } from 'features/sites/siteList/siteListSliceFactory'
import { categoryListReducer } from 'features/campaignCategory/categoryList/categoryListSlice'
import { categoryEditorReducer } from 'features/campaignCategory/categoryEditor/categoryEditorSlice'
import { partnerContactListReducer } from 'features/partnerContact/list/partnerContactListSlice'
import { partnerContactModalReducer } from 'features/partnerContact/modal/partnerContactModalSlice'

export const rootReducer = combineReducers({
  router: connectRouter(history),
  routerHistory: routerHistoryStore,
  auth: authReducer,
  profile: profileReducer,
  campaignList: campaignListReducer,
  campaigns: campaignsReducer,
  categoryList: categoryListReducer,
  categoryEditor: categoryEditorReducer,
  selfPartner: selfPartnerReducer,
  partnerList: partnersListReducer,
  partnerEditor: partnerEditorReducer,
  partnerSiteList: partnerSiteListSlice.reducer,
  partnerContactList: partnerContactListReducer,
  partnerContactModal: partnerContactModalReducer,
  siteList: siteListSlice.reducer,
  newsletterList: newsletterListReducer,
  siteEditor: siteEditorReducer,
  newsletterEditor: newsletterEditorReducer,
  userAccessList: userAccessListReducer,
  notification: notificationReducer
})

export type RootState = ReturnType<typeof rootReducer>
