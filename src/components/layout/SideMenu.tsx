import React, { FC } from 'react'
import { Drawer, Layout } from 'antd'
import { useIsMobile } from 'hooks'
import { ReactComponent as LogoDark } from 'assets/img/logo_dark.svg'
import { ReactComponent as LogoMini } from 'assets/img/logo_dark_mini.svg'
import './SideMenu.scss'

export interface SideMenuProps {
  open: boolean
  onClose: (open: boolean) => void
  className?: string
}

export const SideMenu: FC<SideMenuProps> = props => {
  const { open, onClose, className, children } = props
  const isMobile = useIsMobile()

  const Header: FC = () => (
    <div className="side-menu__header">
      {!open && !isMobile ? (
        <LogoMini className="side-menu__logo side-menu__logo--mini" />
      ) : (
        <LogoDark className="side-menu__logo" />
      )}
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
          <div className="items-container">
            <Header />
            {children}
          </div>
        </Drawer>
      ) : (
        <Layout.Sider
          className="side-menu"
          trigger={null}
          collapsible
          collapsed={!open}
          onCollapse={collapsed => onClose(collapsed)}
        >
          <div className="items-container">
            <Header />
            {children}
          </div>
        </Layout.Sider>
      )}
    </>
  )
}
