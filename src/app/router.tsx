import React from 'react';
import { withRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from 'components/PrivateRoute';
import HomePage from 'features/home/HomePage';
import TestPage from 'features/test/TestPage';

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute exact path="/test" component={TestPage} />
    </Switch>
  );
};

export default withRouter(Routes);
export const history = createBrowserHistory();
