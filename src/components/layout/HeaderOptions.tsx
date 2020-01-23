import React, { FC } from 'react'
import './layout.scss'
import SubMenu from 'antd/lib/menu/SubMenu'
import { Menu, Avatar, Badge } from 'antd'
import { UserOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { logout } from 'features/auth/authSlice'
import { Link } from 'react-router-dom'

interface HeaderOptionsProps {
  openNotifications: () => void
}

export const HeaderOptions: FC<HeaderOptionsProps> = props => {
  const { openNotifications } = props
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const unreadCount = useSelector((state: RootState) => state.notification.unreadCount)

  return (
    <Menu className="header__options" mode="horizontal" selectable={false} subMenuCloseDelay={1.2}>
      <Menu.Item key="notification" onClick={openNotifications}>
        <Badge className="notification-badge" count={unreadCount}>
          <BellOutlined />
        </Badge>
      </Menu.Item>
      {/* // TODO: User picture */}
      <SubMenu title={<Avatar shape="square" icon={<UserOutlined />} />}>
        <Menu.Item key="profile">
          <UserOutlined />
          {t('auth.profile')}
          <Link to="/profile" />
        </Menu.Item>
        <Menu.Item key="logout" onClick={() => dispatch(logout())}>
          <LogoutOutlined /> {t('auth.logout')}
        </Menu.Item>
      </SubMenu>
    </Menu>
  )
}
