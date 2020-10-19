import React from 'react'
import { RouteProps, Redirect } from 'react-router-dom'
import { PrivateLayout } from 'components/layout/PrivateLayout'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'hooks/react-redux-hooks'
import { hasPermission } from '../services/jwt-reader'
import { Roles } from 'api/swagger/coupon'
import { ApmRoute } from '@elastic/apm-rum-react'

interface PrivateRouteProps extends RouteProps {
  roles?: Roles[]
}

export const PrivateRoute: React.FC<PrivateRouteProps> = props => {
  const { roles } = props
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn)

  if (!loggedIn) {
    return <Redirect to={{ pathname: '/auth' }} />
  }

  return (
    <>
      {hasPermission(roles) ? (
        <PrivateLayout>
          <ApmRoute {...props} />
        </PrivateLayout>
      ) : (
        <Redirect to="/error/403" />
      )}
    </>
  )
}
