import { StatusDisplay } from 'components/StatusDisplay'
import { TFunction } from 'i18next'
import { ProfileStatus } from 'models/profileListItem'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface ProfileStatusDisplayProps {
  status: ProfileStatus
}

const profileStatusBadgeColor = (status: ProfileStatus): string => {
  switch (status) {
    case 'approved':
      return '#78e625'
    case 'declined':
      return '#a6adb4'
    case 'waiting-for-approval':
      return '#35a2e5'
  }
}

const profileStatusText = (t: TFunction, status: ProfileStatus): string => {
  return t('profiles.status.' + status)
}

export const ProfileStatusDisplay: React.FC<ProfileStatusDisplayProps> = ({ status }) => {
  const { t } = useTranslation()
  return (
    <StatusDisplay text={profileStatusText(t, status)} color={profileStatusBadgeColor(status)} />
  )
}
