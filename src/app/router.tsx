import React from 'react';
import { withRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from 'components/PrivateRoute';
import DashboardPage from 'features/dashboard/DashboardPage';
import CouponsListPage from 'features/couponsList/CouponsListPage';
import CouponEditorPage from 'features/couponEditor/CouponEditorPage';

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={DashboardPage} />
      <PrivateRoute exact path="/coupons" component={CouponsListPage} />
      <PrivateRoute exact path="/coupons/create" component={CouponEditorPage} />
    </Switch>
  );
};

export default withRouter(Routes);
export const history = createBrowserHistory();
