import React, { FC } from 'react'
import { PartnerContactList } from './list/PartnerContactList'
import { PartnerContactEditor } from 'features/partnerContact/modal/editor/PartnerContactEditor'
import { ListRequestParams } from 'hooks/useTableUtils'
import { UserType } from 'models/user'

export interface PartnerContactConfig {
  shrinks: boolean
  userType: UserType
  canEdit: boolean
  listConstraint: ListRequestParams
}

export const PartnerContactTile: FC<PartnerContactConfig> = config => {
  return (
    <>
      <PartnerContactList config={config} />
      <PartnerContactEditor config={config} />
    </>
  )
}
