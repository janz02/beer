import React, { FC } from 'react'
import './notification.scss'
import { Drawer } from 'antd'
import { NotificationList } from './NotificationList'
import { useTranslation } from 'react-i18next'

interface NotificationDrawerProps {
  open: boolean
  onClose: any
}

export const NotificationDrawer: FC<NotificationDrawerProps> = props => {
  const { open, onClose } = props
  const { t } = useTranslation()

  return (
    <Drawer
      className="notification-drawer"
      visible={open}
      onClose={onClose}
      width={320}
      placement="right"
      closable
    >
      <div className="notification-drawer__header">
        <div className="notification-drawer__header__title">{t('notification.notifications')}</div>
      </div>
      <NotificationList onClick={onClose} />
    </Drawer>
  )
}
