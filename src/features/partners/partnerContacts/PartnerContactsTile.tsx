import React, { FC } from 'react'
import { PartnerContactsList } from './PartnerContactsList'

interface PartnerContactsTileProps {
  hidden?: boolean
}
export const PartnerContactsTile: FC<PartnerContactsTileProps> = props => {
  const { hidden } = props

  return (
    <>
      <PartnerContactsList />
    </>
  )
}
