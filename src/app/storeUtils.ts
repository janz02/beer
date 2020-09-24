import { campaignActions } from '../features/campaigns/campaignsSlice'
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
import { campaignListActions } from 'features/campaigns/campaignList/campaignListSlice'
import { campaignCategoryEditorActions } from 'features/settings/campaignCategories/categoryEditor/campaignCategoryEditorSlice'
import { campaignCategoryListActions } from 'features/settings/campaignCategories/categoryList/campaignCategoryListSlice'
import { segmentationCategoryListActions } from 'features/settings/segmentationCategories/categoryList/segmentationCategoryListSlice'
import { segmentationCategoryEditorActions } from 'features/settings/segmentationCategories/categoryEditor/segmentationCategoryEditorSlice'
import { partnerContactListActions } from 'features/partnerContact/list/partnerContactListSlice'
import { partnerContactModalActions } from 'features/partnerContact/modal/partnerContactModalSlice'
import { authActions } from 'features/auth/authSlice'
import { siteListActions } from 'features/sites/siteList/siteListSlice'

interface HardResetParams {
  logout?: boolean
}

export const hardResetStore = (params: HardResetParams = {}): AppThunk => async dispatch => {
  const { logout } = params
  batch(() => {
    dispatch(authActions.resetAuth())
    dispatch(profileActions.resetProfile())
    dispatch(notificationActions.resetNotification())
    dispatch(siteListActions.reset())
    dispatch(siteEditorActions.reset())
    dispatch(campaignActions.resetCampaigns())
    dispatch(campaignListActions.resetCampaignList())
    dispatch(campaignCategoryEditorActions.resetCategoryEditor())
    dispatch(campaignCategoryListActions.resetCategoryList())
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
    logout && dispatch(resetRouterHistory())
  })
}
