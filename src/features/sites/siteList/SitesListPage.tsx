import React, { FC } from 'react'
import { SiteList } from './SiteList'
import { hasPermission } from 'services/jwt-reader'
import { pageViewRoles } from 'services/roleHelpers'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'hooks/react-redux-hooks'
import { SiteFeatureConfig } from './useSiteList'

export const getSiteListPageConfig = (): SiteFeatureConfig => ({
  canEdit: hasPermission(pageViewRoles.sitesEditor),
  routeRoot: '/sites/editor',
  routeExit: '/sites',
  shrinks: false
})

export const SiteListPage: FC = () => {
  const partnerId = useSelector((state: RootState) => state.auth.userData.partnerId)
  if (!partnerId) {
    return <></>
  }

  const siteListPageConfig = getSiteListPageConfig()
  return <SiteList config={siteListPageConfig} partnerId={partnerId} />
}
