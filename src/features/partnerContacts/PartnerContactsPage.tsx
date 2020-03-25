import React, { FC } from 'react'
import { ResponsivePage } from 'components/responsive/ResponsivePage'
import { PartnerContactsTile } from './PartnerContactsTile'

export const PartnerContactsPage: FC = () => {
  return (
    <ResponsivePage>
      <PartnerContactsTile />
    </ResponsivePage>
  )
}
