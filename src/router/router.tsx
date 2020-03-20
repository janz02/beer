import React from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { PrivateRoute } from 'router/PrivateRoute'
import { DashboardPage } from 'features/dashboard/DashboardPage'
import { CouponCreatePage } from 'features/coupons/couponCreate/CouponCreatePage'
import { CouponEditorPage } from 'features/coupons/couponEditor/CouponEditorPage'
import { CouponListPage } from 'features/coupons/couponList/CouponListPage'
import { PublicRoute } from 'router/PublicRoute'
import { LoginPage } from 'features/auth/LoginPage'
import { RecoveryPage } from 'features/auth/RecoveryPage'
import { SignupPage } from 'features/auth/SignupPage'
import { CategoryPage } from 'features/couponCategory/CategoryPage'
import { ErrorPage } from '../components/error/ErrorPage'
import { ProfileEditorPage } from 'features/profile/ProfileEditorPage'
import { SitesListPage } from 'features/sites/siteList/SitesListPage'
import { SiteEditorPage } from 'features/sites/siteEditor/SiteEditorPage'
import { NewsletterEditorPage } from 'features/newsletter/newsletter-editor/NewsletterEditorPage'
import { NewsletterListPage } from 'features/newsletter/newsletter-list/NewsletterListPage'
import { CouponViewPage } from 'features/coupons/couponView/CouponViewPage'
import { UserAccessListPage } from 'features/userAccess/UserAccessListPage'
import { Roles } from 'api/swagger/models'
import { isLoggedIn } from 'services/jwt-reader'
import { PartnerListPage } from 'features/partners/partnerList/PartnerListPage'
import { SelfPartnerEditorPage } from 'features/partners/selfPartner/SelfPartnerEditorPage'
import { PartnerEditorPage } from 'features/partners/partnerEditor/PartnerEditorPage'

const comboRoles = {
  forPartner: [Roles.PartnerContactApprover, Roles.PartnerContactEditor],
  forNkm: [
    Roles.Administrator,
    Roles.CampaignManager,
    Roles.PartnerManager,
    Roles.BusinessPartnerManager
  ],
  forAll: [
    Roles.Administrator,
    Roles.CampaignManager,
    Roles.PartnerManager,
    Roles.BusinessPartnerManager,
    Roles.PartnerContactApprover,
    Roles.PartnerContactEditor
  ]
}

export const pageViewRoles = {
  users: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerManager],
  newsletters: [Roles.Administrator, Roles.CampaignManager],
  coupons: comboRoles.forAll,
  couponEditor: [Roles.Administrator, Roles.CampaignManager, ...comboRoles.forPartner],
  sites: comboRoles.forAll, // union of forNkm and forPartner, fs overlap
  categories: comboRoles.forNkm,
  categoryEditor: [Roles.Administrator],
  segments: comboRoles.forNkm,
  profile: comboRoles.forPartner,
  partner: comboRoles.forAll, // union of forNkm and forPartner, fs overlap
  partners: comboRoles.forNkm,
  partnersEditor: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerManager],
  tags: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerManager]
}

const onDefaultRoute = (): JSX.Element => {
  if (!isLoggedIn()) {
    return <Redirect to="/auth" />
  }
  return <Redirect to="/coupons" />
}

const Routes = (): JSX.Element => (
  <Switch>
    <PublicRoute onlyPublic exact path="/auth" component={LoginPage} />
    <PublicRoute onlyPublic exact path="/auth/signup" component={SignupPage} />
    <PublicRoute onlyPublic exact path="/auth/recovery" component={RecoveryPage} />
    <PublicRoute exact path="/error" component={ErrorPage} />
    <PublicRoute exact path="/error/:type" component={ErrorPage} />
    <PrivateRoute exact path="/dashboard" component={DashboardPage} />
    <PrivateRoute
      exact
      path="/selfpartner"
      roles={pageViewRoles.partner}
      component={SelfPartnerEditorPage}
    />
    <PrivateRoute
      exact
      path="/partners"
      roles={pageViewRoles.partners}
      component={PartnerListPage}
    />
    <PrivateRoute
      exact
      path="/partner"
      roles={pageViewRoles.partners}
      component={PartnerEditorPage}
    />
    <PrivateRoute
      exact
      path="/partner/:id"
      roles={pageViewRoles.partnersEditor}
      component={PartnerEditorPage}
    />
    <PrivateRoute
      exact
      path="/partner/:id/edit"
      roles={pageViewRoles.partnersEditor}
      component={PartnerEditorPage}
    />
    <PrivateRoute exact path="/coupons" roles={pageViewRoles.coupons} component={CouponListPage} />
    <PrivateRoute
      exact
      path="/coupon"
      roles={pageViewRoles.couponEditor}
      component={CouponCreatePage}
    />
    <PrivateRoute
      exact
      path="/coupon/:id"
      roles={pageViewRoles.coupons}
      component={CouponViewPage}
    />
    <PrivateRoute
      exact
      path="/coupon/:id/edit"
      roles={pageViewRoles.couponEditor}
      component={CouponEditorPage}
    />
    <PrivateRoute
      exact
      path="/categories"
      roles={pageViewRoles.categories}
      component={CategoryPage}
    />
    <PrivateRoute
      exact
      path="/categories/:id"
      roles={pageViewRoles.categoryEditor}
      component={CategoryPage}
    />
    <PrivateRoute
      exact
      path="/profile"
      roles={pageViewRoles.profile}
      component={ProfileEditorPage}
    />
    <PrivateRoute exact path="/sites" roles={pageViewRoles.sites} component={SitesListPage} />
    <PrivateRoute
      exact
      path="/sites/editor/"
      roles={pageViewRoles.sites}
      component={SiteEditorPage}
    />
    <PrivateRoute
      exact
      path="/sites/editor/:id"
      roles={pageViewRoles.sites}
      component={SiteEditorPage}
    />
    <PrivateRoute
      exact
      path="/sites/editor/:id/:cashierId"
      roles={pageViewRoles.sites}
      component={SiteEditorPage}
    />
    <PrivateRoute
      exact
      path="/newsletter"
      roles={pageViewRoles.newsletters}
      component={NewsletterListPage}
    />
    <PrivateRoute
      exact
      path="/newsletter/:id"
      roles={pageViewRoles.newsletters}
      component={NewsletterEditorPage}
    />
    <PrivateRoute exact path="/users" roles={pageViewRoles.users} component={UserAccessListPage} />
    <Route path="*" render={onDefaultRoute} />
  </Switch>
)

export const RouterView = withRouter(Routes)
export const history = createBrowserHistory()
