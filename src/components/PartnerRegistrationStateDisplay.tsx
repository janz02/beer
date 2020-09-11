import { PartnerRegistrationState } from 'api2/swagger/coupon'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface PartnerRegistrationStateDisplayProps {
  partnerRegistrationState?: PartnerRegistrationState
}

export const PartnerRegistrationStateDisplay: FC<PartnerRegistrationStateDisplayProps> = props => {
  const { partnerRegistrationState } = props
  const { t } = useTranslation()

  if (!partnerRegistrationState) return <></>

  return <>{t(`partner.partner-registration-state.${partnerRegistrationState?.toLowerCase()}`)}</>
}
