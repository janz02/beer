import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import PrivateLayout from 'components/PrivateLayout';
import { RootState } from 'app/rootReducer';
import { useSelector } from 'react-redux';

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect to={{ pathname: '/auth' }} />
  }

  return (
    <PrivateLayout>
      <Route {...props} />
    </PrivateLayout>
  );
};

export default PrivateRoute;
