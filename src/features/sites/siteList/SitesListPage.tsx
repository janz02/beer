import React, { FC } from 'react'
import { SiteFeatureConfig } from './siteListSlice'
import { SiteList } from './SiteList'
import { hasPermission } from 'services/jwt-reader'
import { pageViewRoles } from 'services/roleHelpers'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'hooks/react-redux-hooks'

export const SiteListPage: FC = () => {
  const partnerId = useSelector((state: RootState) => state.auth.userData.partnerId)!

  const config: SiteFeatureConfig = {
    canEdit: hasPermission(pageViewRoles.sitesEditor),
    routeRoot: '/sites/editor',
    routeExit: '/sites',
    shrinks: false
  }

  return <SiteList config={config} partnerId={partnerId} />
}
