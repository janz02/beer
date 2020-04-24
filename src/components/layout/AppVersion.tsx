import React, { FC } from 'react'

interface AppVersionProps {
  className?: string
  hide?: boolean
}

export const AppVersion: FC<AppVersionProps> = props => {
  const { hide, className } = props
  const appVersion = process.env.REACT_APP_VERSION

  return <div className={`app-version ${className}`}>{!hide && <span>v{appVersion}</span>}</div>
}
