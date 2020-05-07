import { campaignActions } from '../features/campaigns/campaignsSlice'
import { batch } from 'react-redux'
import { notificationActions } from 'features/notification/notificationSlice'
import { AppThunk } from './store'
import { siteEditorActions } from 'features/sites/siteEditor/siteEditorSlice'
import { userAccessActions } from 'features/userAccess/userAccessSlice'
import { newsletterListActions } from 'features/newsletter/newsletterList/newsletterListSlice'
import { resetNewsletterEditor } from 'features/newsletter/newsletter-editor/newsletterEditorSlice'
import { resetRouterHistory } from 'router/routerHistoryStore'
import { resetPartnersList } from 'features/partners/partnerList/partnerListSlice'
import { resetSelfPartner } from 'features/partners/selfPartner/selfPartnerSlice'
import { resetPartnerEditor } from 'features/partners/partnerEditor/partnerEditorSlice'
import { profileActions } from 'features/profile/profileSlice'
import { campaignListActions } from 'features/campaigns/campaignList/campaignListSlice'
import { categoryEditorActions } from 'features/campaignCategory/categoryEditor/categoryEditorSlice'
import { categoryListActions } from 'features/campaignCategory/categoryList/categoryListSlice'
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
    dispatch(categoryEditorActions.resetCategoryEditor())
    dispatch(categoryListActions.resetCategoryList())
    dispatch(userAccessActions.reset())
    dispatch(newsletterListActions.resetNewsletterList())
    dispatch(resetNewsletterEditor())
    dispatch(resetPartnersList())
    dispatch(resetPartnerEditor())
    dispatch(resetSelfPartner())
    dispatch(partnerContactListActions.reset())
    dispatch(partnerContactModalActions.reset())
    logout && dispatch(resetRouterHistory())
  })
}
