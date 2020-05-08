import React, { FC } from 'react'
import { SiteFeatureConfig } from './siteListSlice'
import { SiteList } from './SiteList'

export const SiteListPage: FC = () => {
  const config: SiteFeatureConfig = {
    routeRoot: '/sites/editor',
    routeExit: '/sites',
    shrinks: false
  }

  return <SiteList config={config} />
}
