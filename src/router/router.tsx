import React from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { PrivateRoute } from 'router/PrivateRoute'
import { DashboardPage } from 'features/dashboard/DashboardPage'
import { CampaignCreatePage } from 'features/campaigns/campaign/CampaignCreatePage'
import { CampaignEditorPage } from 'features/campaigns/campaign/CampaignEditorPage'
import { CampaignListPage } from 'features/campaigns/campaignList/CampaignListPage'
import { PublicRoute } from 'router/PublicRoute'
import { LoginPage } from 'features/auth/LoginPage'
import { RecoveryPage } from 'features/auth/RecoveryPage'
import { SignupPage } from 'features/auth/SignupPage'
import { ErrorPage } from '../components/error/ErrorPage'
import { ProfileEditorPage } from 'features/profile/ProfileEditorPage'
import { SiteEditorPage } from 'features/sites/siteEditor/SiteEditorPage'
import { NewsletterEditorPage } from 'features/newsletter/newsletter-editor/NewsletterEditorPage'
import { CampaignViewPage } from 'features/campaigns/campaign/CampaignViewPage'
import { UserAccessPage } from 'features/userAccess/UserAccessPage'
import { isLoggedIn } from 'services/jwt-reader'
import { PartnerListPage } from 'features/partners/partnerList/PartnerListPage'
import { SelfPartnerEditorPage } from 'features/partners/selfPartner/SelfPartnerEditorPage'
import { PartnerEditorPage } from 'features/partners/partnerEditor/PartnerEditorPage'
import { pageViewRoles } from 'services/roleHelpers'
import { SettingsPage } from 'features/settings/SettingsPage'
import { NewsletterListPage } from 'features/newsletter/newsletterList/NewsletterListPage'
import { PartnerContactPage } from 'features/partnerContact/PartnerContactPage'
import { SiteListPage } from 'features/sites/siteList/SitesListPage'
import { PermissionEditorPage } from 'features/permissions/permissionEditor/PermissionEditorPage'
import { PermissionListPage } from 'features/permissions/permissionList/PermissionListPage'
import { BpHistoryListPage } from 'features/bpHistory/bpHistoryList/BpHistoryListPage'

const onDefaultRoute = (): JSX.Element => {
  if (!isLoggedIn()) {
    return <Redirect to="/auth" />
  }
  return <Redirect to="/campaigns" />
}

const Routes = (): JSX.Element => (
  <Switch>
    <PublicRoute onlyPublic exact path="/auth" component={LoginPage} />
    <PublicRoute onlyPublic exact path="/auth/signup/:registrationCode?" component={SignupPage} />
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
    <PrivateRoute exact path="/sites" roles={pageViewRoles.sites} component={SiteListPage} />
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
      component={PartnerContactPage}
    />
    <PrivateRoute
      exact
      path="/campaigns"
      roles={pageViewRoles.campaigns}
      component={CampaignListPage}
    />
    <PrivateRoute
      exact
      path="/campaign"
      roles={pageViewRoles.couponCreator}
      component={CampaignCreatePage}
    />
    <PrivateRoute
      exact
      path="/campaign/:id"
      roles={pageViewRoles.campaigns}
      component={CampaignViewPage}
    />
    <PrivateRoute
      exact
      path="/campaign/:id/edit"
      roles={pageViewRoles.couponEditor}
      component={CampaignEditorPage}
    />
    <PrivateRoute exact path="/settings" roles={pageViewRoles.settings} component={SettingsPage} />
    <PrivateRoute
      exact
      path="/settings/:tab/:id"
      roles={pageViewRoles.settings}
      component={SettingsPage}
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
      path="/newsletter/:templateId"
      roles={pageViewRoles.newsletters}
      component={NewsletterEditorPage}
    />
    <PrivateRoute exact path="/users" roles={pageViewRoles.users} component={UserAccessPage} />
    <PrivateRoute
      exact
      path="/bp-history"
      roles={pageViewRoles.bpHistory}
      component={BpHistoryListPage}
    />
    <PrivateRoute
      exact
      path="/permissions"
      roles={pageViewRoles.permissions}
      component={PermissionListPage}
    />
    <PrivateRoute
      exact
      path={['/permissions/new', '/permissions/:permissionId']}
      roles={pageViewRoles.permissionEditor}
      component={PermissionEditorPage}
    />
    <Route path="*" render={onDefaultRoute} />
  </Switch>
)

export const RouterView = withRouter(Routes)
export const history = createBrowserHistory()
