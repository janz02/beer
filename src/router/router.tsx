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
import { PartnerContactsPage } from 'features/partnerContacts/PartnerContactsPage'

export const comboRoles = {
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
  couponCreator: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerContactEditor],
  couponEditor: [Roles.Administrator, Roles.CampaignManager, ...comboRoles.forPartner],
  sites: comboRoles.forAll, // union of forNkm and forPartner, fs overlap
  categories: comboRoles.forNkm,
  categoryEditor: [Roles.Administrator],
  segments: comboRoles.forNkm,
  profile: comboRoles.forPartner,
  readonlyProfile: comboRoles.forNkm,
  selfpartner: comboRoles.forAll, // union of forNkm and forPartner, fs overlap
  partners: comboRoles.forNkm,
  contacts: comboRoles.forPartner,
  tags: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerManager]
}

const onDefaultRoute = (): JSX.Element => {
  if (!isLoggedIn()) {
    return <Redirect to="/auth" />
  }
  return <Redirect to="/campaigns" />
}

const Routes = (): JSX.Element => (
  <Switch>
    <PublicRoute onlyPublic exact path="/auth" component={LoginPage} />
    <PublicRoute onlyPublic exact path="/auth/signup" component={SignupPage} />
    <PublicRoute onlyPublic exact path="/auth/recovery" component={RecoveryPage} />
    <PublicRoute exact path={['/error', '/error/:type']} component={ErrorPage} />
    <PublicRoute exact path="/error/:type" component={ErrorPage} />
    <PrivateRoute exact path="/dashboard" component={DashboardPage} />
    <PrivateRoute
      exact
      path="/selfpartner"
      roles={pageViewRoles.selfpartner}
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
      path={[
        '/partners/new',
        '/partners/:partnerId',
        '/partners/:partnerId/contact',
        '/partners/:partnerId/contact/:contactId'
      ]}
      roles={pageViewRoles.partners}
      component={PartnerEditorPage}
    />

    <PrivateRoute
      exact
      path={[
        '/partners/:partnerId/site',
        '/partners/:partnerId/site/:siteId',
        '/partners/:partnerId/site/:siteId/:cashierId'
      ]}
      roles={pageViewRoles.partners}
      component={SiteEditorPage}
    />
    <PrivateRoute exact path="/sites" roles={pageViewRoles.sites} component={SitesListPage} />
    <PrivateRoute
      exact
      path={['/sites/editor/', '/sites/editor/:siteId', '/sites/editor/:siteId/:cashierId']}
      roles={pageViewRoles.sites}
      component={SiteEditorPage}
    />
    <PrivateRoute
      exact
      path={['/contacts', '/contacts/:contactId']}
      roles={pageViewRoles.contacts}
      component={PartnerContactsPage}
    />
    <PrivateRoute
      exact
      path="/campaigns"
      roles={pageViewRoles.coupons}
      component={CouponListPage}
    />
    <PrivateRoute
      exact
      path="/campaign"
      roles={pageViewRoles.couponCreator}
      component={CouponCreatePage}
    />
    <PrivateRoute
      exact
      path="/campaign/:id"
      roles={pageViewRoles.coupons}
      component={CouponViewPage}
    />
    <PrivateRoute
      exact
      path="/campaign/:id/edit"
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
