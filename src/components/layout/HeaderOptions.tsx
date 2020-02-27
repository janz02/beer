import React, { FC } from 'react'
import './layout.scss'
import { Menu, Badge } from 'antd'
import { UserOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { logout } from 'features/auth/authSlice'
import { Link } from 'react-router-dom'
import { LanguageSelector } from 'components/LanguageSelector'

interface HeaderOptionsProps {
  openNotifications: () => void
}

export const HeaderOptions: FC<HeaderOptionsProps> = props => {
  const { openNotifications } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const unreadCount = useSelector((state: RootState) => state.notification.unreadCount)
  const profile = useSelector((state: RootState) => state.profile.profile)

  return (
    <>
      <Menu
        className="header__options"
        mode="horizontal"
        selectable={false}
        subMenuCloseDelay={1.2}
      >
        <Menu.Item key="profile">
          <UserOutlined />
          {profile?.name}
          <Link to="/profile" />
        </Menu.Item>
        <Menu.Item key="logout" onClick={() => dispatch(logout())}>
          <LogoutOutlined /> {t('auth.logout')}
        </Menu.Item>
        <Menu.Item key="notification" onClick={openNotifications}>
          <Badge className="notification-badge" count={unreadCount}>
            <BellOutlined />
          </Badge>
        </Menu.Item>
        <Menu.Item key="language">
          <LanguageSelector />
        </Menu.Item>
      </Menu>
    </>
  )
}
