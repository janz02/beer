import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Button, { ButtonProps } from 'antd/lib/button'
import React, { FC } from 'react'
import './HeaderMenuButton.scss'

export interface HeaderMenuButtonProps extends ButtonProps {
  open: boolean
  isMobile: boolean
}

export const HeaderMenuButton: FC<HeaderMenuButtonProps> = props => {
  const { open, isMobile, ...buttonProps } = props

  return (
    <div className={`header-menu-button__container ${isMobile ? ' mobile' : ''}`}>
      <div className="header-menu-button__top-border-background" hidden={isMobile}>
        <div className="header-menu-button__top-border" />
      </div>
      <div className="header-menu-button__background">
        <Button
          className="header-menu-button__button"
          {...buttonProps}
          icon={
            open ? (
              <LeftOutlined className="header-menu-button__arrow" />
            ) : (
              <RightOutlined className="header-menu-button__arrow" />
          )
          }
        />
      </div>
      <div className="header-menu-button__bottom-border-background" hidden={isMobile}>
        <div className="header-menu-button__bottom-border" />
      </div>
    </div>
  )
}
