import { useEffect } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export const useSmartBrowserTabTitle = (): void => {
  const { t } = useTranslation()
  const { unreadCount } = useSelector((state: RootState) => state.notification)

  useEffect(() => {
    const notificationCounter = unreadCount ? `(${unreadCount}) - ` : ''
    document.title = notificationCounter + t('app.title')
  }, [unreadCount, t])
}
