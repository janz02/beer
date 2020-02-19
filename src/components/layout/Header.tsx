import React, { FC } from 'react'
import { Layout, Button } from 'antd'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { useIsMobile } from 'hooks'
import './Header.scss'

export interface HeaderProps {
  onMenuClick?: () => void
  open: boolean
}

export const Header: FC<HeaderProps> = props => {
  const { children, onMenuClick, open } = props

  const isMobile = useIsMobile()

  return (
    <Layout.Header className="header">
      {children}
      {onMenuClick && (
        <Button
          className={`header__menu-button ${isMobile ? ' mobile' : ''}`}
          onClick={onMenuClick}
          icon={isMobile ? <RightOutlined /> : open ? <LeftOutlined /> : <RightOutlined />}
        />
      )}
    </Layout.Header>
  )
}
