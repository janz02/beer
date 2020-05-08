import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { PublicLayout } from 'components/layout/PublicLayout'
import { isLoggedIn } from 'services/jwt-reader'

interface PublicRouteProps extends RouteProps {
  onlyPublic?: boolean
}

export const PublicRoute: React.FC<PublicRouteProps> = props => {
  const { onlyPublic } = props

  if (isLoggedIn() && onlyPublic) {
    return <Redirect to={{ pathname: '/' }} />
  }

  return (
    <PublicLayout>
      <Route {...props} />
    </PublicLayout>
  )
}
