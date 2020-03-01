import React, { FC } from 'react'
import './ResponsiveCard.scss'
import { useIsMobile } from 'hooks'
import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'

export interface ResponsiveCardProps extends CardProps {
  floatingTitle?: string
  floatingOptions?: JSX.Element
  innerTitle?: string
  innerOptions?: JSX.Element
  forTable?: boolean
}

const headerFactory = (
  type: 'inner' | 'floating',
  title: string | undefined,
  options: JSX.Element | undefined
): JSX.Element => (
  <div className={`r-card-header r-card-header--${type}`}>
    <span className="title">{title}</span>
    <span className="options">{options}</span>
  </div>
)

export const ResponsiveCard: FC<ResponsiveCardProps> = props => {
  const {
    floatingTitle,
    floatingOptions,
    innerTitle,
    innerOptions,
    children,
    forTable,
    ...rest
  } = props
  const isMobile = useIsMobile()

  const hasInnerHeader = innerTitle || innerOptions

  return (
    <div className={`r-card-container ${isMobile ? 'r-card-container--mobile' : ''}`}>
      {headerFactory('floating', floatingTitle, floatingOptions)}
      <Card
        {...rest}
        title={hasInnerHeader ? headerFactory('inner', innerTitle, innerOptions) : undefined}
        className={`r-card 
          ${isMobile ? 'r-card--mobile' : ''} 
          ${forTable ? 'as-table-wrapper' : ''}`}
      >
        {children}
      </Card>
    </div>
  )
}
