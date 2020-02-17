import React, { FC } from 'react'
import './ResponsiveCard.scss'
import { useIsMobile } from 'hooks'
import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'

export type ResponsiveCardProps = CardProps

export const ResponsiveCard: FC<ResponsiveCardProps> = props => {
  const { children, ...rest } = props

  const isMobile = useIsMobile()

  return (
    <div
      className={`responsive-card-container ${isMobile ? 'responsive-card-container--mobile' : ''}`}
    >
      <Card {...rest} className={`responsive-card ${isMobile ? 'responsive-card--mobile' : ''}`}>
        {children}
      </Card>
    </div>
  )
}
