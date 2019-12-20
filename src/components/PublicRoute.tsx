import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import PublicLayout from 'components/PublicLayout';
import { RootState } from 'app/rootReducer';
import { useSelector } from 'react-redux';

interface PublicRouteProps extends RouteProps {
  onlyPublic?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = props => {
  const { onlyPublic } = props;

  const loggedIn = useSelector((state: RootState) => state.auth.user.loggedIn);

  if (loggedIn && onlyPublic) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <PublicLayout>
      <Route {...props} />
    </PublicLayout>
  );
};

export default PublicRoute;
