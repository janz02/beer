import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import PrivateLayout from 'components/layout/PrivateLayout'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'react-redux'
import { hasPermission } from '../services/jwt-reader'
import { Role } from 'models/user'

interface PrivateRouteProps extends RouteProps {
  roles?: Role[]
}

const PrivateRoute: React.FC<PrivateRouteProps> = props => {
  const { roles } = props
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn)

  console.log(hasPermission([Role.PARTNER]))

  if (!loggedIn) {
    return <Redirect to={{ pathname: '/auth' }} />
  }

  return (
    <>
      {hasPermission(roles) ? (
        <PrivateLayout>
          <Route {...props} />
        </PrivateLayout>
      ) : (
        <Redirect to="/error" />
      )}
    </>
  )
}

export default PrivateRoute
