import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import PrivateLayout from 'components/PrivateLayout';

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  // const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  // if (!loggedIn) {
  //   return <Redirect to={{ pathname: '/login' }} />
  // }

  return (
    <PrivateLayout>
      <Route {...props} />
    </PrivateLayout>
  );
};

export default PrivateRoute;
