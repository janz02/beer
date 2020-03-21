import React, { FC } from 'react'
import './ResponsiveCard.scss'
import { useIsMobile } from 'hooks'
import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'
import { ResponsiveHeader } from './ResponsiveHeader'
import { BackButtonProps } from 'components/buttons/BackButton'

export interface ResponsiveCardProps extends CardProps {
  floatingTitle?: string
  floatingBackButton?: BackButtonProps
  floatingOptions?: JSX.Element
  innerTitle?: string
  innerOptions?: JSX.Element
  forTable?: boolean
  paddedTop?: boolean
  paddedBottom?: boolean
  width?: 'skinny' | 'normal' | 'full'
}

export const ResponsiveCard: FC<ResponsiveCardProps> = props => {
  const {
    floatingTitle,
    floatingOptions,
    floatingBackButton,
    innerTitle,
    innerOptions,
    children,
    forTable,
    paddedTop,
    paddedBottom,
    width,
    ...rest
  } = props
  const isMobile = useIsMobile()

  const hasFloatingHeader = !!floatingTitle || !!floatingOptions
  const hasInnerHeader = (!!innerTitle || !!innerOptions) ?? undefined

  const innerHeader = hasInnerHeader && (
    <ResponsiveHeader type="inner" title={innerTitle} options={innerOptions} />
  )

  const floatingHeader = hasFloatingHeader && (
    <ResponsiveHeader
      type="floating"
      title={floatingTitle}
      options={floatingOptions}
      backButton={floatingBackButton}
    />
  )

  return (
    <div
      className={
        `r-card-container ` +
        `${paddedTop ? 'r-card-container--padded-top ' : ''}` +
        `${paddedBottom ? 'r-card-container--padded-bottom ' : ''}` +
        `${`r-card-container--width-${width ?? 'normal'} `}` +
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
          `${forTable ? 'as-table-wrapper ' : ''}`
        }
      >
        {children}
      </Card>
    </div>
  )
}
