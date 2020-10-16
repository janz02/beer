import React from 'react'
import { RouteProps, Redirect } from 'react-router-dom'
import { PublicLayout } from 'components/layout/PublicLayout'
import { isLoggedIn } from 'services/jwt-reader'
import { ApmRoute } from '@elastic/apm-rum-react'

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
      <ApmRoute {...props} />
    </PublicLayout>
  )
}
