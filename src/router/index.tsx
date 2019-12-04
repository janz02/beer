import React from 'react';
import { withRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from '../components/views/Home';
import PrivateRoute from '../components/routes/PrivateRoute';

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
    </Switch>
  );
};

export default withRouter(Routes);
export const history = createBrowserHistory();
