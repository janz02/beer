import React, { FC } from 'react'
import './ResponsiveCard.scss'
import { useIsMobile } from 'hooks'
import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'

export interface ResponsiveCardProps extends CardProps {
  floatingTitle?: string
  floatingOptions?: JSX.Element
}

export const ResponsiveCard: FC<ResponsiveCardProps> = props => {
  const { floatingTitle, floatingOptions, children, ...rest } = props
  const isMobile = useIsMobile()

  return (
    <div className={`r-card-container ${isMobile ? 'r-card-container--mobile' : ''}`}>
      <div className="r-card-header">
        <div className="r-card-header__title">{floatingTitle}</div>
        <div className="r-card-header__options">{floatingOptions}</div>
      </div>

      <Card {...rest} className={`r-card ${isMobile ? 'r-card--mobile' : ''}`}>
        {children}
      </Card>
    </div>
  )
}
