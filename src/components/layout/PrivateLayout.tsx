import React, { useState, useEffect, useMemo } from 'react'
import { Layout } from 'antd'
import { useIsMobile } from 'hooks'
import { HeaderOptions } from './HeaderOptions'
import { Header } from './Header'
import './layout.scss'
import { NotificationDrawer } from 'features/notification/NotificationDrawer'
import { SideMenu } from './SideMenu'
import { SideMenuOptions, SideMenuOptionProps } from './SideMenuOptions'
import { getProfile } from 'features/profile/profileSlice'
import { useDispatch } from 'react-redux'
import {
  UserOutlined,
  BarcodeOutlined,
  HomeFilled,
  ShopOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  SendOutlined,
  AppstoreAddOutlined,
  ContactsOutlined
} from '@ant-design/icons'
import { pageViewRoles } from 'router/router'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { useTranslation } from 'react-i18next'
import { logout } from 'features/auth/authSlice'

export const PrivateLayout: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [menuOpened, setMenuOpened] = useState(!isMobile)
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false)
  const [lastMediaQuery, setLastMediaQuery] = useState(isMobile)

  const profile = useSelector((state: RootState) => state.profile.profile)

  useEffect(() => {
    if (lastMediaQuery !== isMobile) {
      if (isMobile) {
        setMenuOpened(false)
      }
    }
    setLastMediaQuery(isMobile)
  }, [isMobile, lastMediaQuery])

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  const closeDrawer = (): void => {
    if (isMobile) {
      setMenuOpened(false)
    }
  }

  const mainOptions = useMemo<SideMenuOptionProps[]>(
    () => [
      {
        label: t('menu.coupons'),
        link: '/coupons',
        icon: <BarcodeOutlined />,
        roles: pageViewRoles.coupons
      },
      {
        label: t('menu.sites'),
        link: '/sites',
        icon: <ShopOutlined />,
        roles: pageViewRoles.sites
      },
      {
        label: t('menu.partner-data'),
        link: '/partner',
        icon: <ContactsOutlined />,
        roles: pageViewRoles.partner
      },
      {
        label: t('menu.coupon-categories'),
        link: '/categories',
        icon: <AppstoreAddOutlined />,
        roles: pageViewRoles.categories
      },
      {
        label: t('menu.newsletter'),
        link: '/newsletter',
        icon: <SendOutlined />,
        roles: pageViewRoles.newsletters
      },
      {
        label: t('menu.users'),
        link: '/users',
        icon: <UsergroupAddOutlined />,
        roles: pageViewRoles.users
      },
      {
        label: t('menu.partners'),
        link: '/partners',
        icon: <HomeFilled />,
        roles: pageViewRoles.users
      }
    ],
    [t]
  )

  const footerOptions = useMemo<SideMenuOptionProps[]>(
    () => [
      {
        label: profile?.name ?? t('menu.profile'),
        link: '/profile',
        icon: <UserOutlined />,
        roles: pageViewRoles.profile
      },
      {
        label: t('auth.logout'),
        icon: <LogoutOutlined />,
        onClick: () => dispatch(logout())
      }
    ],
    [dispatch, profile, t]
  )

  return (
    <Layout className="layout">
      <SideMenu open={menuOpened} onClose={(open: boolean) => setMenuOpened(open)}>
        <SideMenuOptions options={mainOptions} handleClose={closeDrawer} />
        <SideMenuOptions footer options={footerOptions} handleClose={closeDrawer} />
      </SideMenu>

      <NotificationDrawer
        open={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
      />

      <Layout>
        <Header onMenuClick={() => setMenuOpened(!menuOpened)} open={menuOpened}>
          <HeaderOptions openNotifications={() => setNotificationDrawerOpen(true)} />
        </Header>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  )
}
