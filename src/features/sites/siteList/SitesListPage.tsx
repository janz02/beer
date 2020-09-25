import React, { FC } from 'react'
import { SiteFeatureConfig } from './siteListSlice'
import { SiteList } from './SiteList'
import { hasPermission } from 'services/jwt-reader'
import { pageViewRoles } from 'services/roleHelpers'

export const SiteListPage: FC = () => {
  const config: SiteFeatureConfig = {
    canEdit: hasPermission(pageViewRoles.sitesEditor),
    routeRoot: '/sites/editor',
    routeExit: '/sites',
    shrinks: false
  }

  return <SiteList config={config} />
}
