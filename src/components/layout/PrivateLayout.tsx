import React, { useState, useEffect, useMemo } from 'react'
import { Layout, Button } from 'antd'
import { useIsMobile } from 'hooks'
import './layout.scss'
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
  ContactsOutlined,
  RightOutlined,
  LeftOutlined
} from '@ant-design/icons'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { useTranslation } from 'react-i18next'
import { logout } from 'features/auth/authSlice'
import { pageViewRoles } from 'services/roleHelpers'

export const PrivateLayout: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [menuOpened, setMenuOpened] = useState(!isMobile)
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
        label: t('menu.campaigns'),
        link: '/campaigns',
        icon: <BarcodeOutlined />,
        roles: pageViewRoles.campaigns
      },
      {
        label: t('menu.partners'),
        link: '/partners',
        icon: <HomeFilled />,
        roles: pageViewRoles.partners
      },
      {
        label: t('menu.partner-data'),
        link: '/selfpartner',
        icon: <ContactsOutlined />,
        roles: pageViewRoles.selfpartner
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
        label: t('menu.campaign-categories'),
        link: '/categories',
        icon: <AppstoreAddOutlined />,
        roles: pageViewRoles.categories
      },
      {
        label: t('menu.sites'),
        link: '/sites',
        icon: <ShopOutlined />,
        roles: pageViewRoles.sites
      },
      {
        label: t('menu.partner-contacts'),
        link: '/contacts',
        icon: <UsergroupAddOutlined />,
        roles: pageViewRoles.contacts
      }
    ],
    [t]
  )

  const footerOptions = useMemo<SideMenuOptionProps[]>(
    () => [
      {
        // Slice is necessary because this way the tooltip won't shoot off
        // far right when the name is really long.
        label: profile?.name?.slice(0, 20) ?? t('menu.profile'),
        labelTooltip: profile?.name ?? t('menu.profile'),
        link: '/profile',
        icon: <UserOutlined />,
        roles: pageViewRoles.profile
      },
      {
        // Slice is necessary because this way the tooltip won't shoot off
        // far right when the name is really long.
        label: profile?.name?.slice(0, 20) ?? t('menu.profile'),
        labelTooltip: profile?.name ?? t('menu.profile'),
        icon: <UserOutlined />,
        roles: pageViewRoles.readonlyProfile
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
        <SideMenuOptions
          collapsed={!menuOpened}
          footer
          options={footerOptions}
          handleClose={closeDrawer}
        />
      </SideMenu>

      {/* Removed until there are available notifications */}
      {/* <NotificationDrawer
        open={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
      /> */}

      <Layout>
        <Button
          className={`header__menu-button ${isMobile ? ' mobile' : ''}`}
          onClick={() => setMenuOpened(!menuOpened)}
          icon={isMobile ? <RightOutlined /> : menuOpened ? <LeftOutlined /> : <RightOutlined />}
        />
        <Layout.Content className="layout-content">{children}</Layout.Content>
      </Layout>
    </Layout>
  )
}
