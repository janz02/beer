import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { routerHistoryStore } from '../router/routerHistoryStore'
import { userAccessReducer } from 'features/userAccess/userAccessSlice'
import { newsletterEditorReducer } from 'features/newsletter/newsletter-editor/newsletterEditorSlice'
import { authReducer } from 'features/auth/authSlice'
import { couponCampaignListReducer } from 'features/couponCampaigns/couponCampaignList/couponCampaignListSlice'
import { couponCampaignsReducer } from 'features/couponCampaigns/couponCampaignsSlice'
import { notificationReducer } from 'features/notification/notificationSlice'
import { profileReducer } from 'features/profile/profileSlice'
import { siteEditorReducer } from 'features/sites/siteEditor/siteEditorSlice'
import { newsletterListReducer } from 'features/newsletter/newsletterList/newsletterListSlice'
import { partnersListReducer } from 'features/partners/partnerList/partnerListSlice'
import { selfPartnerReducer } from 'features/partners/selfPartner/selfPartnerSlice'
import { partnerEditorReducer } from 'features/partners/partnerEditor/partnerEditorSlice'
import { couponCampaignCategoryListReducer } from 'features/settings/couponCampaignCategories/categoryList/couponCampaignCategoryListSlice'
import { segmentationCategoryListReducer } from 'features/settings/segmentationCategories/categoryList/segmentationCategoryListSlice'
import { segmentationCategoryEditorReducer } from 'features/settings/segmentationCategories/categoryEditor/segmentationCategoryEditorSlice'
import { couponCampaignCategoryEditorReducer } from 'features/settings/couponCampaignCategories/categoryEditor/couponCampaignCategoryEditorSlice'
import { partnerContactListReducer } from 'features/partnerContact/list/partnerContactListSlice'
import { partnerContactModalReducer } from 'features/partnerContact/modal/partnerContactModalSlice'
import { bpHistoryReducer } from 'features/bpHistory/bpHistorySlice'
import { siteListReducer } from 'features/sites/siteList/siteListSlice'
import { testGroupCategoryListReducer } from 'features/settings/testGroupCategory/testGroupCategoryList/testGroupCategoryListSlice'
import { testGroupCategoryEditorReducer } from 'features/settings/testGroupCategory/testGroupCategoryEditor/testGroupCategoryEditorSlice'
import { productListReducer } from 'features/settings/products/productList/productListSlice'
import { productEditorReducer } from 'features/settings/products/productEditor/productEditorSlice'
import { createBrowserHistory } from 'history'
import { permissionListReducer } from 'features/permissions/permissionList/permissionListSlice'
import { permissionEditorReducer } from 'features/permissions/permissionEditor/permissionEditorSlice'
import { segmentationListReducer } from 'features/segmentation/segmentationList/segmentationListSlice'
import { segmentationEditorReducer } from 'features/segmentation/segmentationEditor/segmentationEditorSlice'
import { systemParamsReducer } from 'features/settings/systemParams/systemParamsSlice'

// TODO Temporary fix for app.test.  ../router/router history was used here
// Probably a mock for the router/ history needed for proper solution, but needs more investigation
const browserHistory = createBrowserHistory()

export const rootReducer = combineReducers({
  router: connectRouter(browserHistory),
  routerHistory: routerHistoryStore,
  auth: authReducer,
  profile: profileReducer,
  couponCampaignList: couponCampaignListReducer,
  couponCampaigns: couponCampaignsReducer,
  couponCampaignCategoryList: couponCampaignCategoryListReducer,
  couponCampaignCategoryEditor: couponCampaignCategoryEditorReducer,
  segmentationCategoryEditor: segmentationCategoryEditorReducer,
  segmentationCategoryList: segmentationCategoryListReducer,
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
  notification: notificationReducer,
  productList: productListReducer,
  productEditor: productEditorReducer,
  testGroupCategoryList: testGroupCategoryListReducer,
  testGroupCategoryEditor: testGroupCategoryEditorReducer,
  bpHistory: bpHistoryReducer,
  permissionList: permissionListReducer,
  permissionEditor: permissionEditorReducer,
  segmentationList: segmentationListReducer,
  segmentationEditor: segmentationEditorReducer,
  systemParams: systemParamsReducer
})

export type RootState = ReturnType<typeof rootReducer>
