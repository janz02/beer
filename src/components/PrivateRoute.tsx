import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import PrivateLayout from 'components/layout/PrivateLayout';
import { RootState } from 'app/rootReducer';
import { useSelector } from 'react-redux';

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  if (!loggedIn) {
    return <Redirect to={{ pathname: '/auth' }} />
  }

  return (
    <PrivateLayout>
      <Route {...props} />
    </PrivateLayout>
  );
};

export default PrivateRoute;
