import React, { FC } from 'react'
import { Layout } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import Logo from 'assets/img/logo.svg'

interface HeaderProps {
  empty?: boolean
  onMenuClick?: () => void
}

export const Header: FC<HeaderProps> = props => {
  const { onMenuClick, empty, children } = props

  return (
    <Layout.Header className={`header ${empty ? 'header--empty' : ''}`}>
      {onMenuClick && <MenuOutlined className="header__menu-button" onClick={onMenuClick} />}
      <img src={Logo} alt="Logo" title="Logo" />
      {children}
    </Layout.Header>
  )
}
