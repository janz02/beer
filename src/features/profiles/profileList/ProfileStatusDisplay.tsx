import './ProfileStatusDisplay.scss'
import { StatusDisplay } from 'components/StatusDisplay'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ProfileStatus } from 'api/swagger/admin'

interface ProfileStatusDisplayProps {
  status?: ProfileStatus
}

export const kebabCasedProfileStatus = (status?: ProfileStatus): string => {
  if (!status) return ''

  switch (status) {
    case ProfileStatus.Active:
      return 'active'
    case ProfileStatus.InActive:
      return 'inactive'
    case ProfileStatus.WaitingForApproval:
      return 'waiting-for-approval'
    case ProfileStatus.Declined:
      return 'declined'
  }
}

export const ProfileStatusDisplay: React.FC<ProfileStatusDisplayProps> = ({ status }) => {
  const { t } = useTranslation()
  const s = kebabCasedProfileStatus(status)

  return <StatusDisplay text={t(`profiles.status.${s}`)} className={`profile-status-${s}`} />
}
