import React, { FC } from 'react'
import './layout.scss'
import { Menu, Badge } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'hooks/react-redux-hooks'
import { LanguageSelector } from 'components/LanguageSelector'

interface HeaderOptionsProps {
  openNotifications: () => void
}

export const HeaderOptions: FC<HeaderOptionsProps> = props => {
  const { openNotifications } = props
  const unreadCount = useSelector((state: RootState) => state.notification.unreadCount)

  return (
    <>
      <Menu
        className="header__options"
        mode="horizontal"
        selectable={false}
        subMenuCloseDelay={1.2}
      >
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
