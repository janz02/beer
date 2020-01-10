import React from 'react';
import { withRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from 'components/PrivateRoute';
import DashboardPage from 'features/dashboard/DashboardPage';
import CouponCreatePage from 'features/coupons/couponCreate/CouponCreatePage';
import CouponEditorPage from 'features/coupons/couponEditor/CouponEditorPage';
import CouponListPage from 'features/coupons/couponList/CouponListPage';
import PublicRoute from 'components/PublicRoute';
import { LoginPage } from 'features/auth/LoginPage';
import { RecoveryPage } from 'features/auth/RecoveryPage';
import { SignupPage } from 'features/auth/SignupPage';
import { CategoryPage } from 'features/coupon-category/CategoryPage';

const Routes = () => {
  return (
    <Switch>
      <PublicRoute onlyPublic exact path="/auth" component={LoginPage} />
      <PublicRoute
        onlyPublic
        exact
        path="/auth/signup"
        component={SignupPage}
      />
      <PublicRoute
        onlyPublic
        exact
        path="/auth/recovery"
        component={RecoveryPage}
      />
      <PrivateRoute exact path="/" component={DashboardPage} />
      <PrivateRoute exact path="/coupons" component={CouponListPage} />
      <PrivateRoute exact path="/coupons/create" component={CouponCreatePage} />
      <PrivateRoute exact path="/categories" component={CategoryPage} />
      <PrivateRoute
        exact
        path="/coupons/:id/:editing"
        component={CouponEditorPage}
      />
    </Switch>
  );
};

export default withRouter(Routes);
export const history = createBrowserHistory();
