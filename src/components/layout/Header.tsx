import React, { FC } from 'react'
import { Layout } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

interface HeaderProps {
  onMenuClick?: () => void
}

export const Header: FC<HeaderProps> = props => {
  const { onMenuClick, children } = props

  return (
    <Layout.Header className="header">
      {onMenuClick && <MenuOutlined className="header__menu-button" onClick={onMenuClick} />}
      {children}
    </Layout.Header>
  )
}
