import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { PublicLayout } from 'components/layout/PublicLayout'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'react-redux'

interface PublicRouteProps extends RouteProps {
  onlyPublic?: boolean
}

export const PublicRoute: React.FC<PublicRouteProps> = props => {
  const { onlyPublic } = props

  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn)

  if (loggedIn && onlyPublic) {
    return <Redirect to={{ pathname: '/' }} />
  }

  return (
    <PublicLayout>
      <Route {...props} />
    </PublicLayout>
  )
}