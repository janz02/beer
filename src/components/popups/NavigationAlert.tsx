import React, { FC } from 'react'
import { Prompt } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface NavigationAlertProps {
  when: boolean
}

export const NavigationAlert: FC<NavigationAlertProps> = ({ when }) => {
  const { t } = useTranslation()
  return <Prompt when={when} message={t('warning-prompt.nav-unsaved-changes')} />
}
