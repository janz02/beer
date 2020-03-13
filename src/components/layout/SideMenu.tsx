import React, { FC } from 'react'
import { Drawer, Layout } from 'antd'
import { useIsMobile } from 'hooks'
import { ReactComponent as Logo } from 'assets/img/logo.svg'
import './SideMenu.scss'

export interface SideMenuProps {
  open: boolean
  onClose: (open: boolean) => void
}

export const SideMenu: FC<SideMenuProps> = props => {
  const { open, onClose, children } = props
  const isMobile = useIsMobile()

  const Header: FC = () => (
    <div className="side-menu__header">
      <Logo className={`side-menu__logo ${!open && !isMobile ? 'side-menu__logo--mini' : ''}`} />
    </div>
  )

  return (
    <>
      {isMobile ? (
        <Drawer
          className="drawer"
          placement="left"
          closable={false}
          onClose={() => onClose(false)}
          visible={open}
        >
          <Header />
          {children}
        </Drawer>
      ) : (
        <Layout.Sider
          className="side-menu"
          trigger={null}
          collapsible
          collapsed={!open}
          onCollapse={collapsed => onClose(collapsed)}
        >
          <Header />
          {children}
        </Layout.Sider>
      )}
    </>
  )
}
