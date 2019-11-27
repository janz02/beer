import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from '../components/views/Home';

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} />
    </Switch>
  );
};

export default withRouter(Routes);
export const history = createBrowserHistory();
