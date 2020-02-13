import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import { useIsMobile } from 'hooks'
import { HeaderOptions } from './HeaderOptions'
import { Header } from './Header'
import './layout.scss'
import { LanguageSelector } from 'components/LanguageSelector'
import { NotificationDrawer } from 'features/notification/NotificationDrawer'
import { SideMenu } from './SideMenu'
import { SideMenuOptions } from './SideMenuOptions'

export const PrivateLayout: React.FC = ({ children }) => {
  const isMobile = useIsMobile()

  const [menuOpened, setMenuOpened] = useState(!isMobile)
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false)
  const [lastMediaQuery, setLastMediaQuery] = useState(isMobile)

  useEffect(() => {
    if (lastMediaQuery !== isMobile) {
      if (isMobile) {
        setMenuOpened(false)
      }
    }
    setLastMediaQuery(isMobile)
  }, [isMobile, lastMediaQuery])

  const closeDrawer = (): void => {
    if (isMobile) {
      setMenuOpened(false)
    }
  }

  return (
    <Layout className="layout">
      <SideMenu open={menuOpened} onClose={(open: boolean) => setMenuOpened(open)}>
        <SideMenuOptions onOptionClick={closeDrawer} />
        <LanguageSelector menuClosed={!menuOpened} />
      </SideMenu>

      <NotificationDrawer
        open={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
      />

      <Layout>
        <Header onMenuClick={() => setMenuOpened(!menuOpened)}>
          <HeaderOptions openNotifications={() => setNotificationDrawerOpen(true)} />
        </Header>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  )
}
