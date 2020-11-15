import { couponCampaignActions } from '../features/couponCampaigns/couponCampaignsSlice'
import { batch } from 'react-redux'
import { notificationActions } from 'features/notification/notificationSlice'
import { AppThunk } from './store'
import { siteEditorActions } from 'features/sites/siteEditor/siteEditorSlice'
import { userAccessActions } from 'features/userAccess/userAccessSlice'
import { newsletterListActions } from 'features/newsletter/newsletterList/newsletterListSlice'
import { newsletterEditorActions } from 'features/newsletter/newsletter-editor/newsletterEditorSlice'
import { resetRouterHistory } from 'router/routerHistoryStore'
import { resetPartnersList } from 'features/partners/partnerList/partnerListSlice'
import { resetSelfPartner } from 'features/partners/selfPartner/selfPartnerSlice'
import { resetPartnerEditor } from 'features/partners/partnerEditor/partnerEditorSlice'
import { profileActions } from 'features/profile/profileSlice'
import { couponCampaignListActions } from 'features/couponCampaigns/couponCampaignList/couponCampaignListSlice'
import { couponCampaignCategoryEditorActions } from 'features/settings/couponCampaignCategories/categoryEditor/couponCampaignCategoryEditorSlice'
import { couponCampaignCategoryListActions } from 'features/settings/couponCampaignCategories/categoryList/couponCampaignCategoryListSlice'
import { segmentationCategoryListActions } from 'features/settings/segmentationCategories/categoryList/segmentationCategoryListSlice'
import { segmentationCategoryEditorActions } from 'features/settings/segmentationCategories/categoryEditor/segmentationCategoryEditorSlice'
import { partnerContactListActions } from 'features/partnerContact/list/partnerContactListSlice'
import { partnerContactModalActions } from 'features/partnerContact/modal/partnerContactModalSlice'
import { authActions } from 'features/auth/authSlice'
import { siteListActions } from 'features/sites/siteList/siteListSlice'
import { testGroupCategoryListActions } from 'features/settings/testGroupCategory/testGroupCategoryList/testGroupCategoryListSlice'
import { testGroupCategoryEditorActions } from 'features/settings/testGroupCategory/testGroupCategoryEditor/testGroupCategoryEditorSlice'
import { resetBpHistory } from 'features/bpHistory/bpHistorySlice'
import { systemParamsActions } from 'features/settings/systemParams/systemParamsSlice'
import { campaignListActions } from 'features/campaigns/campaignList/campaignListSlice'
import { profilesActions } from 'features/profiles/profilesSlice'
import { companiesActions } from 'features/organization/companies/companiesSlice'

interface HardResetParams {
  logout?: boolean
}

export const hardResetStore = (params: HardResetParams = {}): AppThunk => async dispatch => {
  const { logout } = params
  batch(() => {
    dispatch(authActions.resetAuth())
    dispatch(profileActions.resetProfile())
    dispatch(profilesActions.reset())
    dispatch(notificationActions.resetNotification())
    dispatch(siteListActions.reset())
    dispatch(siteEditorActions.reset())
    dispatch(couponCampaignActions.resetCampaigns())
    dispatch(couponCampaignListActions.resetCampaignList())
    dispatch(couponCampaignCategoryEditorActions.resetCategoryEditor())
    dispatch(couponCampaignCategoryListActions.resetCategoryList())
    dispatch(segmentationCategoryListActions.resetCategoryList())
    dispatch(segmentationCategoryEditorActions.resetCategoryEditor())
    dispatch(userAccessActions.reset())
    dispatch(newsletterListActions.resetNewsletterList())
    dispatch(newsletterEditorActions.reset())
    dispatch(resetPartnersList())
    dispatch(resetPartnerEditor())
    dispatch(resetSelfPartner())
    dispatch(partnerContactListActions.reset())
    dispatch(partnerContactModalActions.reset())
    dispatch(testGroupCategoryListActions.resetCategoryList())
    dispatch(testGroupCategoryEditorActions.resetCategoryEditor())
    dispatch(resetBpHistory())
    dispatch(systemParamsActions.resetSystemParams())
    dispatch(campaignListActions.resetCampaignsList())
    dispatch(companiesActions.reset())
    logout && dispatch(resetRouterHistory())
  })
}
