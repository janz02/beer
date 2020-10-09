import React, { FC } from 'react'
import { PartnerContactList } from './list/PartnerContactList'
import { PartnerContactEditor } from 'features/partnerContact/modal/PartnerContactEditor'
import { ListRequestParams } from 'hooks/useTableUtils'
import { UserType } from 'models/user'
import { PartnerContactInviter } from './modal/PartnerContactInviter'
import { usePartnerContactModals } from './modal/usePartnerContactModals'

export interface PartnerContactConfig {
  shrinks: boolean
  userType: UserType
  canEdit: boolean
  listConstraint: ListRequestParams
}

export const PartnerContactTile: FC<PartnerContactConfig> = config => {
  const partnerContactModalUtils = usePartnerContactModals({ config })

  return (
    <>
      <PartnerContactList config={config} />
      <PartnerContactEditor config={config} partnerContactModalUtils={partnerContactModalUtils} />
      <PartnerContactInviter partnerContactModalUtils={partnerContactModalUtils} />
    </>
  )
}
