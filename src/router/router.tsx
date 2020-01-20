import React from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import PrivateRoute from 'router/PrivateRoute'
import DashboardPage from 'features/dashboard/DashboardPage'
import CouponCreatePage from 'features/coupons/couponCreate/CouponCreatePage'
import CouponEditorPage from 'features/coupons/couponEditor/CouponEditorPage'
import CouponListPage from 'features/coupons/couponList/CouponListPage'
import PublicRoute from 'router/PublicRoute'
import LoginPage from 'features/auth/LoginPage'
import RecoveryPage from 'features/auth/RecoveryPage'
import SignupPage from 'features/auth/SignupPage'
import CategoryPage from 'features/coupon-category/CategoryPage'
import { ErrorPage } from '../components/error/ErrorPage'

const Routes = (): JSX.Element => (
  <Switch>
    <PublicRoute onlyPublic exact path="/auth" component={LoginPage} />
    <PublicRoute onlyPublic exact path="/auth/signup" component={SignupPage} />
    <PublicRoute onlyPublic exact path="/auth/recovery" component={RecoveryPage} />
    <PublicRoute exact path="/error" component={ErrorPage} />
    <PublicRoute exact path="/error/:type" component={ErrorPage} />
    <PrivateRoute exact path="/" component={DashboardPage} />
    <PrivateRoute exact path="/coupons" component={CouponListPage} />
    <PrivateRoute exact path="/coupons/create" component={CouponCreatePage} />
    <PrivateRoute exact path="/categories" component={CategoryPage} />
    <PrivateRoute exact path="/coupons/:id/:editing" component={CouponEditorPage} />
    <Route path="*" render={() => <Redirect to="/" />} />
  </Switch>
)

export default withRouter(Routes)
export const history = createBrowserHistory()
