import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from 'components/PrivateRoute';
import DashboardPage from 'features/dashboard/DashboardPage';
import { AuthPage } from 'features/auth/AuthPage';
import CouponCreatePage from 'features/coupons/couponCreate/CouponCreatePage';
import CouponEditorPage from 'features/coupons/couponEditor/CouponEditorPage';
import CouponListPage from 'features/coupons/couponList/CouponListPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/auth" component={AuthPage} />
      <PrivateRoute exact path="/" component={DashboardPage} />
      <PrivateRoute exact path="/coupons" component={CouponListPage} />
      <PrivateRoute exact path="/coupons/create" component={CouponCreatePage} />
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
