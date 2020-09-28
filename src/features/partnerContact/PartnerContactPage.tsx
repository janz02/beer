import React, { FC } from 'react'
import { PartnerContactTile, PartnerContactConfig } from './PartnerContactTile'
import { hasPermission } from 'services/jwt-reader'
import { useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { UserType } from 'models/user'
import { pageViewRoles } from 'services/roleHelpers'

export const PartnerContactPage: FC = () => {
  const { partnerId: selfPartnerId } = useSelector((state: RootState) => state.auth.userData)

  const config: PartnerContactConfig = {
    canEdit: hasPermission(pageViewRoles.contactsEditor),
    listConstraint: { partnerId: selfPartnerId },
    shrinks: false,
    userType: UserType.PARTNER
  }

  return <PartnerContactTile {...config} />
}
