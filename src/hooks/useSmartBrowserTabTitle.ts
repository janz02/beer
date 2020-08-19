import { useEffect } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

/**
 * Shows the unseen notification count in the title of the browser tab
 */
export const useSmartBrowserTabTitle = (): void => {
  const { t } = useTranslation()
  const { unseenCount } = useSelector((state: RootState) => state.notification)

  useEffect(() => {
    const notificationCounter = unseenCount ? `(${unseenCount}) - ` : ''
    document.title = notificationCounter + t('app.title')
  }, [unseenCount, t])
}
