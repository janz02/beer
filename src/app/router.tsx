import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from 'components/PrivateRoute';
import DashboardPage from 'features/dashboard/DashboardPage';
import CouponsListPage from 'features/couponsList/CouponsListPage';
import CouponCreatePage from 'features/couponCreate/CouponCreatePage';
import CouponEditorPage from 'features/couponEditor/CouponEditorPage';
import { AuthPage } from 'features/auth/AuthPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/auth" component={AuthPage} />
      <PrivateRoute exact path="/" component={DashboardPage} />
      <PrivateRoute exact path="/coupons" component={CouponsListPage} />
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
