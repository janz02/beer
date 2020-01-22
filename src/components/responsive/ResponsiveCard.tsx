import React, { FC } from 'react'
import './ResponsiveCard.scss'
import { useIsMobile } from 'hooks'
import { Card } from 'antd'

interface ResponsiveCardProps {
  headerTitle?: string
  headerOptions?: FC
}

export const ResponsiveCard: FC<ResponsiveCardProps> = props => {
  const { children } = props

  const isMobile = useIsMobile()

  return (
    <Card className={`responsive-card ${isMobile ? 'responsive-card--mobile' : ''}`}>
      {children}
    </Card>
  )
}
