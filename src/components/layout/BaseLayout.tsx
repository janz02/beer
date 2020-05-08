import React, { FC } from 'react'
import { useSmartBrowserTabTitle } from 'hooks/useSmartBrowserTabTitle'

export const BaseLayout: FC = ({ children }) => {
  useSmartBrowserTabTitle()
  return <>{children}</>
}
