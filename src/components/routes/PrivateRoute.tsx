import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import PrivateLayout from '../layout/PrivateLayout';

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  return (
    <PrivateLayout>
      <Route {...props} />
    </PrivateLayout>
  );
};

export default PrivateRoute;
