import './ProfileStatusDisplay.scss'
import { StatusDisplay } from 'components/StatusDisplay'
import { ProfileStatus } from 'models/profileListItem'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface ProfileStatusDisplayProps {
  status: ProfileStatus
}

export const ProfileStatusDisplay: React.FC<ProfileStatusDisplayProps> = ({ status }) => {
  const { t } = useTranslation()
  return (
    <StatusDisplay text={t('profiles.status.' + status)} className={'profile-status-' + status} />
  )
}
