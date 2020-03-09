import React, { FC } from 'react'
import './ResponsiveCard.scss'
import { useIsMobile } from 'hooks'
import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'
import { ResponsiveHeader } from './ResponsiveHeader'

export interface ResponsiveCardProps extends CardProps {
  floatingTitle?: string
  floatingOptions?: JSX.Element
  innerTitle?: string
  innerOptions?: JSX.Element
  forTable?: boolean
  paddedTop?: boolean
  paddedBottom?: boolean
  wide?: boolean
  extraWide?: boolean
  fullWidth?: boolean
  flexibleHeight?: boolean
}

export const ResponsiveCard: FC<ResponsiveCardProps> = props => {
  const {
    floatingTitle,
    floatingOptions,
    innerTitle,
    innerOptions,
    children,
    forTable,
    paddedTop,
    paddedBottom,
    wide,
    extraWide,
    fullWidth,
    flexibleHeight,
    ...rest
  } = props
  const isMobile = useIsMobile()

  const hasFloatingHeader = !!floatingTitle || !!floatingOptions
  const hasInnerHeader = (!!innerTitle || !!innerOptions) ?? undefined

  const innerHeader = hasInnerHeader && (
    <ResponsiveHeader type="inner" title={innerTitle} options={innerOptions} />
  )

  const floatingHeader = hasFloatingHeader && (
    <ResponsiveHeader type="floating" title={floatingTitle} options={floatingOptions} />
  )

  return (
    <div
      className={
        `r-card-container ` +
        `${paddedTop ? 'r-card-container--padded-top ' : ''}` +
        `${paddedBottom ? 'r-card-container--padded-bottom ' : ''}` +
        `${wide ? 'r-card-container--wide ' : ''}` +
        `${extraWide ? 'r-card-container--extra-wide ' : ''}` +
        `${fullWidth ? 'r-card-container--full-width ' : ''}` +
        `${isMobile ? 'r-card-container--mobile ' : ''}`
      }
    >
      {floatingHeader}
      <Card
        {...rest}
        title={innerHeader}
        className={
          `r-card ` +
          `${isMobile ? 'r-card--mobile ' : ''}` +
          `${flexibleHeight ? 'r-card--flexible-height ' : ''}` +
          `${forTable ? 'as-table-wrapper ' : ''}`
        }
      >
        {children}
      </Card>
    </div>
  )
}
