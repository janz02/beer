import React, { useState, useEffect } from 'react'
import { Layout, Menu, Drawer } from 'antd'
import { DesktopOutlined, FileOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useIsMobile } from 'hooks'
import { HeaderOptions } from './HeaderOptions'
import { Header } from './Header'
import './layout.scss'
import { LanguageSelector } from 'components/LanguageSelector'
import { NotificationDrawer } from 'features/notification/NotificationDrawer'

export const PrivateLayout: React.FC = ({ children }) => {
  const { t } = useTranslation()
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

  const NavigationContent = (): JSX.Element => {
    return (
      <>
        <Menu theme="dark">
          <Menu.Item onClick={closeDrawer}>
            <DesktopOutlined />
            <span>{t('menu.dashboard')}</span>
            <Link to="/" />
          </Menu.Item>
          <Menu.Item onClick={closeDrawer}>
            <FileOutlined />
            <span>{t('menu.partner-data')}</span>
            <Link to="/partner" />
          </Menu.Item>
          <Menu.Item onClick={closeDrawer}>
            <FileOutlined />
            <span>{t('menu.coupons')}</span>
            <Link to="/coupons" />
          </Menu.Item>
          <Menu.Item onClick={closeDrawer}>
            <FileOutlined />
            <span>{t('menu.coupon-categories')}</span>
            <Link to="/categories" />
          </Menu.Item>
          <Menu.Item onClick={closeDrawer}>
            <FileOutlined />
            <span>{t('menu.sites')}</span>
            <Link to="/sites" />
          </Menu.Item>
        </Menu>
        <LanguageSelector menuClosed={!menuOpened} />
      </>
    )
  }

  return (
    <Layout className="layout">
      {isMobile ? (
        <Drawer
          className="drawer"
          placement="left"
          closable={false}
          onClose={() => setMenuOpened(false)}
          visible={menuOpened}
        >
          <NavigationContent />
        </Drawer>
      ) : (
        <Layout.Sider
          trigger={null}
          collapsible
          collapsed={!menuOpened}
          onCollapse={collapsed => setMenuOpened(collapsed)}
        >
          <NavigationContent />
        </Layout.Sider>
      )}

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
