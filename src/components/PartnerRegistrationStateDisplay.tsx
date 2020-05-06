import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PartnerRegistrationState } from 'api/swagger/models'

interface PartnerRegistrationStateDisplayProps {
  partnerRegistrationState?: PartnerRegistrationState
}

export const PartnerRegistrationStateDisplay: FC<PartnerRegistrationStateDisplayProps> = props => {
  const { partnerRegistrationState } = props
  const { t } = useTranslation()

  if (!partnerRegistrationState) return <></>

  return <>{t(`partner.partner-registration-state.${partnerRegistrationState?.toLowerCase()}`)}</>
}
