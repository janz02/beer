import React, { FC } from 'react'
import './ResponsiveHeader.scss'
import { BackButton, BackButtonProps } from 'components/buttons/BackButton'
export interface ResponsiveHeaderProps {
  type?: 'standalone' | 'inner' | 'floating'
  title?: string | undefined
  options?: JSX.Element | undefined
  backButton?: BackButtonProps
}

export const ResponsiveHeader: FC<ResponsiveHeaderProps> = props => {
  const { type, title, options, backButton } = props
  return (
    <div className={`r-header r-header--${type ?? 'standalone'}`}>
      <span className="title">
        {backButton && <BackButton {...backButton} />}
        {title}
      </span>
      <span className="options">{options}</span>
    </div>
  )
}
