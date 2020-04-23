import './NotificationDrawer.scss'
import React, { FC } from 'react'
import { Drawer } from 'antd'
import { NotificationList } from './NotificationList'
import { useTranslation } from 'react-i18next'
import { useNotification } from './useNotification'

export const NotificationDrawer: FC = () => {
  const { t } = useTranslation()

  const { opened, handleClose } = useNotification()

  return (
    <Drawer
      className="notification-drawer"
      visible={opened}
      onClose={handleClose}
      width={320}
      placement="right"
      closable
    >
      <div className="notification-drawer__header">
        <span className="notification-drawer__header__title">
          {t('notification.notifications')}
        </span>
        <span className="notification-drawer__header__options">
          {/* // Header option buttons */}
        </span>
      </div>
      <NotificationList />
    </Drawer>
  )
}
