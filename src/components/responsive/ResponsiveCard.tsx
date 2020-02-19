import React, { FC } from 'react'
import './ResponsiveCard.scss'
import { useIsMobile } from 'hooks'
import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'
import { useTranslation } from 'react-i18next'

export type ResponsiveCardProps = CardProps

export const ResponsiveCard: FC<ResponsiveCardProps> = props => {
  const { children, ...rest } = props

  const isMobile = useIsMobile()
  const { t } = useTranslation()

  return (
    <div
      className={`responsive-card-container ${isMobile ? 'responsive-card-container--mobile' : ''}`}
    >
      <div className="responsive-card-title">{t('profile.editor-title')}</div>

      <Card {...rest} className={`responsive-card ${isMobile ? 'responsive-card--mobile' : ''}`}>
        {children}
      </Card>
    </div>
  )
}
