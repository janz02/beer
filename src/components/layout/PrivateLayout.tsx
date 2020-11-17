import React, { useState, useEffect, useMemo } from 'react'
import { Layout } from 'antd'
import { useIsMobile } from 'hooks'
import './layout.scss'
import { SideMenu } from './SideMenu'
import { SideMenuOptions, SideMenuOptionProps } from './SideMenuOptions'
import { useDispatch } from 'react-redux'
import {
  UserOutlined,
  BarcodeOutlined,
  HomeFilled,
  ShopOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  SendOutlined,
  SettingOutlined,
  ContactsOutlined,
  HistoryOutlined,
  ClusterOutlined,
  DeploymentUnitOutlined,
  PieChartOutlined,
  PlayCircleOutlined
} from '@ant-design/icons'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { useTranslation } from 'react-i18next'
import { logout } from 'features/auth/authSlice'
import { pageViewRoles } from 'services/roleHelpers'
import { myProfileActions } from 'features/myProfile/myProfileSlice'
import { NotificationFab } from 'features/notification/NotificationFab'
import { NotificationDrawer } from 'features/notification/NotificationDrawer'
import { hasPermission } from 'services/jwt-reader'
import {
  notificationRoleConfig,
  useNotificationUtils
} from 'features/notification/useNotificationUtils'
import { HeaderMenuButton } from 'components/buttons/HeaderMenuButton'

export const PrivateLayout: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [menuOpened, setMenuOpened] = useState(!isMobile)
  const [lastMediaQuery, setLastMediaQuery] = useState(isMobile)
  const profile = useSelector((state: RootState) => state.myProfile.profile)
  const notificationUtils = useNotificationUtils()

  useEffect(() => {
    if (lastMediaQuery !== isMobile) {
      if (isMobile) {
        setMenuOpened(false)
      }
    }
    setLastMediaQuery(isMobile)
  }, [isMobile, lastMediaQuery])

  useEffect(() => {
    dispatch(myProfileActions.getMyProfile())
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
        icon: <PlayCircleOutlined />,
        roles: pageViewRoles.campaigns
      },
      {
        label: t('menu.coupon-campaigns'),
        link: '/couponCampaigns',
        icon: <BarcodeOutlined />,
        roles: pageViewRoles.couponCampaigns
      },
      {
        label: t('menu.partners'),
        link: '/partners',
        icon: <HomeFilled />,
        roles: pageViewRoles.partners
      },
      {
        label: t('menu.segmentations'),
        link: '/segmentations',
        icon: <PieChartOutlined />,
        roles: pageViewRoles.segmentations
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
        label: t('menu.settings'),
        link: '/settings',
        icon: <SettingOutlined />,
        roles: pageViewRoles.settings
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
      },
      {
        label: t('menu.bp-history'),
        link: '/bp-history',
        icon: <HistoryOutlined />,
        roles: pageViewRoles.bpHistory
      },
      {
        label: t('menu.permissions'),
        link: '/permissions',
        icon: <ClusterOutlined />,
        roles: pageViewRoles.permissions
      },
      {
        label: t('menu.organization'),
        link: '/organization',
        icon: <DeploymentUnitOutlined />,
        roles: pageViewRoles.organization
      },
      {
        label: t('menu.profiles'),
        link: '/profiles',
        icon: <UsergroupAddOutlined />,
        roles: pageViewRoles.profiles
      }
    ],
    [t]
  )

  const footerOptions = useMemo<SideMenuOptionProps[]>(
    () => [
      {
        // Slice is necessary because this way the tooltip won't shoot off
        // far right when the name is really long.
        label: profile?.name?.slice(0, 20) ?? t('menu.my-profile'),
        labelTooltip: profile?.name ?? t('menu.my-profile'),
        link: '/my-profile',
        icon: <UserOutlined />,
        roles: pageViewRoles.myProfile
      },
      {
        // Slice is necessary because this way the tooltip won't shoot off
        // far right when the name is really long.
        label: profile?.name?.slice(0, 20) ?? t('menu.my-profile'),
        labelTooltip: profile?.name ?? t('menu.my-profile'),
        icon: <UserOutlined />,
        roles: pageViewRoles.readonlyMyProfile
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

      {hasPermission(notificationRoleConfig) && (
        <NotificationDrawer notificationUtils={notificationUtils} />
      )}

      <Layout>
        <HeaderMenuButton
          open={menuOpened && !isMobile}
          onClick={() => setMenuOpened(!menuOpened)}
        />
        <Layout.Content className="layout-content">
          {children}
          {hasPermission(notificationRoleConfig) && (
            <NotificationFab notificationUtils={notificationUtils} />
          )}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
