import React, { FC, useEffect } from 'react'
import { Prompt } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface NavigationAlertProps {
  when: boolean
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
const useBeforeUnload = (when: boolean, message: string): void => {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent): void => {
      if (when) {
        e.preventDefault()
        e.returnValue = message
      }
    }

    window.addEventListener('beforeunload', handler)
    return () => {
      window.removeEventListener('beforeunload', handler)
    }
  }, [when, message])
}

export const NavigationAlert: FC<NavigationAlertProps> = ({ when }) => {
  const { t } = useTranslation()
  const message = t('warning-prompt.nav-unsaved-changes')
  useBeforeUnload(when, message)

  return <Prompt when={when} message={message} />
}
