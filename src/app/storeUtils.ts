import { batch } from 'react-redux'
import { resetNotification } from 'features/notification/notificationSlice'
import { AppThunk } from './store'
import { resetAuth } from 'features/auth/authSlice'
import { resetProfile } from 'features/profile/profileSlice'
import { resetSiteEditor } from 'features/sites/siteEditor/siteEditorSlice'
import { resetCategoryEditor } from 'features/couponCategory/categoryEditor/categoryEditorSlice'
import { resetCategoryList } from 'features/couponCategory/categoryList/categoryListSlice'
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

interface HardResetParams {
  logout?: boolean
}

export const hardResetStore = (params: HardResetParams = {}): AppThunk => async dispatch => {
  const { logout } = params
  batch(() => {
    dispatch(resetAuth())
    dispatch(resetProfile())
    dispatch(resetSiteEditor())
    dispatch(resetNotification())
    dispatch(resetCategoryEditor())
    dispatch(resetCategoryList())
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
