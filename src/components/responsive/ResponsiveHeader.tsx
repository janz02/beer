import React, { FC } from 'react'
import './ResponsiveHeader.scss'
export interface ResponsiveHeaderProps {
  type?: 'standalone' | 'inner' | 'floating'
  title?: string | undefined
  options?: JSX.Element | undefined
}

export const ResponsiveHeader: FC<ResponsiveHeaderProps> = props => {
  const { type, title, options } = props
  return (
    <div className={`r-header r-header--${type ?? 'standalone'}`}>
      <span className="title">{title}</span>
      <span className="options">{options}</span>
    </div>
  )
}
