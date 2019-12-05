import React from 'react';
import { withRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from 'components/routes/PrivateRoute';
import Home from 'components/views/Home';
import Test from 'components/views/Test';

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/test" component={Test} />
    </Switch>
  );
};

export default withRouter(Routes);
export const history = createBrowserHistory();
