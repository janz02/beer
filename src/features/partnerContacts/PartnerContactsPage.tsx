import React, { FC } from 'react'
import { PartnerContactsTile } from './PartnerContactsTile'
import { PartnerContactList } from 'features/partnerContact/list/PartnerContactList'
import { PartnerContactTile } from 'features/partnerContact/PartnerContactTile'

export const PartnerContactsPage: FC = () => {
  return (
    <>
      <PartnerContactTile />
      {/* <PartnerContactList /> */}
      <PartnerContactsTile />
    </>
  )
}
