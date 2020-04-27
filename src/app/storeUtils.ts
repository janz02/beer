import { campaignActions } from '../features/campaigns/campaignsSlice'
import { batch } from 'react-redux'
import { notificationActions } from 'features/notification/notificationSlice'
import { AppThunk } from './store'
import { resetAuth } from 'features/auth/authSlice'
import { resetSiteEditor } from 'features/sites/siteEditor/siteEditorSlice'
import { resetUsersAccessList } from 'features/userAccess/userAccessListSlice'
import { newsletterListActions } from 'features/newsletter/newsletterList/newsletterListSlice'
import { resetNewsletterEditor } from 'features/newsletter/newsletter-editor/newsletterEditorSlice'
import { resetRouterHistory } from 'router/routerHistoryStore'
import { resetPartnersList } from 'features/partners/partnerList/partnerListSlice'
import { resetSelfPartner } from 'features/partners/selfPartner/selfPartnerSlice'
import { resetPartnerEditor } from 'features/partners/partnerEditor/partnerEditorSlice'
import { siteListSlice, partnerSiteListSlice } from 'features/sites/siteList/siteListSliceFactory'
import {
  contactsSlice,
  partnerContactsSlice
} from 'features/partnerContacts/partnerContactsSliceFactory'
import { profileActions } from 'features/profile/profileSlice'
import { campaignListActions } from 'features/campaigns/campaignList/campaignListSlice'
import { categoryEditorActions } from 'features/campaignCategory/categoryEditor/categoryEditorSlice'
import { categoryListActions } from 'features/campaignCategory/categoryList/categoryListSlice'

interface HardResetParams {
  logout?: boolean
}

export const hardResetStore = (params: HardResetParams = {}): AppThunk => async dispatch => {
  const { logout } = params
  batch(() => {
    dispatch(resetAuth())
    dispatch(profileActions.resetProfile())
    dispatch(resetSiteEditor())
    dispatch(notificationActions.resetNotification())
    dispatch(campaignActions.resetCampaigns())
    dispatch(campaignListActions.resetCampaignList())
    dispatch(categoryEditorActions.resetCategoryEditor())
    dispatch(categoryListActions.resetCategoryList())
    dispatch(resetUsersAccessList())
    dispatch(resetUsersAccessList())
    dispatch(newsletterListActions.resetNewsletterList())
    dispatch(resetNewsletterEditor())
    dispatch(resetPartnersList())
    dispatch(resetPartnerEditor())
    dispatch(resetSelfPartner())
    dispatch(siteListSlice.actions.reset())
    dispatch(partnerSiteListSlice.actions.reset())
    dispatch(contactsSlice.actions.reset())
    dispatch(partnerContactsSlice.actions.reset())
    logout && dispatch(resetRouterHistory())
  })
}
