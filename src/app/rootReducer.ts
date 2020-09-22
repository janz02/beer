import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { routerHistoryStore } from '../router/routerHistoryStore'
import { userAccessReducer } from 'features/userAccess/userAccessSlice'
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
import { categoryListReducer } from 'features/settings/campaignCategory/categoryList/categoryListSlice'
import { categoryEditorReducer } from 'features/settings/campaignCategory/categoryEditor/categoryEditorSlice'
import { partnerContactListReducer } from 'features/partnerContact/list/partnerContactListSlice'
import { partnerContactModalReducer } from 'features/partnerContact/modal/partnerContactModalSlice'
import { siteListReducer } from 'features/sites/siteList/siteListSlice'
import { createBrowserHistory } from 'history'

// TODO Temporary fix for app.test.  ../router/router history was used here
// Probably a mock for the router/ history needed for proper solution, but needs more investigation
const browserHistory = createBrowserHistory()

export const rootReducer = combineReducers({
  router: connectRouter(browserHistory),
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
  partnerContactList: partnerContactListReducer,
  partnerContactModal: partnerContactModalReducer,
  newsletterList: newsletterListReducer,
  siteList: siteListReducer,
  siteEditor: siteEditorReducer,
  newsletterEditor: newsletterEditorReducer,
  userAccess: userAccessReducer,
  notification: notificationReducer
})

export type RootState = ReturnType<typeof rootReducer>
