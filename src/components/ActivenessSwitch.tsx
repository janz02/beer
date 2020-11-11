import './ActivenessSwitch.scss'
import { Switch } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SwitchProps } from 'antd/lib/switch'

interface ActivenessSwitchProps extends SwitchProps {
  isActive: boolean
}

export const ActivenessSwitch: React.FC<ActivenessSwitchProps> = ({ isActive, ...rest }) => {
  const { t } = useTranslation()

  return (
    <>
      <Switch className="activeness-switch" checked={isActive} size="small" {...rest} />
      {isActive ? t('common.active') : t('common.inactive')}
    </>
  )
}
