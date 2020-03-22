import React, { FC } from 'react'
import { ResponsivePage } from 'components/responsive/ResponsivePage'
import { SitesListTile } from './SitesListTile'

export const SitesListPage: FC = () => {
  return (
    <ResponsivePage>
      <SitesListTile />
    </ResponsivePage>
  )
}
