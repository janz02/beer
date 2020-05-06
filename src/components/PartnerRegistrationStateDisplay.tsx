import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface PartnerRegistrationStateDisplayProps {
  registrationState?: string
}

export const PartnerRegistrationStateDisplay: FC<PartnerRegistrationStateDisplayProps> = props => {
  const { registrationState } = props
  const { t } = useTranslation()

  if (!registrationState) return <></>

  // TODO: integration, add translation keys to backend enums.
  return <>{t(`partner.registration-state.${registrationState?.toLowerCase()}`)}</>
}
