import { batch } from 'react-redux'
import { notificationActions } from 'features/notification/notificationSlice'
import { AppThunk } from './store'
import { resetAuth } from 'features/auth/authSlice'
import { resetSiteEditor } from 'features/sites/siteEditor/siteEditorSlice'
import { categoryEditorActions } from 'features/couponCategory/categoryEditor/categoryEditorSlice'
import { categoryListActions } from 'features/couponCategory/categoryList/categoryListSlice'
import { resetCoupons } from 'features/coupons/couponsSlice'
import { resetCouponList } from 'features/coupons/couponList/couponListSlice'
import { resetUsersAccessList } from 'features/userAccess/userAccessListSlice'
import { resetNewsLetterList } from 'features/newsletter/newsletter-list/newsletterListSlice'
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
    dispatch(categoryEditorActions.resetCategoryEditor())
    dispatch(categoryListActions.resetCategoryList())
    dispatch(resetCoupons())
    dispatch(resetCouponList())
    dispatch(resetUsersAccessList())
    dispatch(resetUsersAccessList())
    dispatch(resetNewsLetterList())
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
