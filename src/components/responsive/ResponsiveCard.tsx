import React, { FC } from 'react'
import './ResponsiveCard.scss'
import { useIsMobile } from 'hooks'
import { Card } from 'antd'

export const ResponsiveCard: FC = props => {
  const { children } = props

  const isMobile = useIsMobile()

  return (
    <div
      className={`responsive-card-container ${isMobile ? 'responsive-card-container--mobile' : ''}`}
    >
      <Card className={`responsive-card ${isMobile ? 'responsive-card--mobile' : ''}`}>
        {children}
      </Card>
    </div>
  )
}
