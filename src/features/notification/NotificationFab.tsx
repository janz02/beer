import React, { FC, useEffect } from 'react'
import { FloatingActionButton } from 'components/buttons/FloatingActionButton'
import { BellOutlined } from '@ant-design/icons'
import { UseNotificationFeatures } from './useNotification'

interface NotificationFabProps {
  notificationFeatures: UseNotificationFeatures
}

export const NotificationFab: FC<NotificationFabProps> = props => {
  const {
    handleOpen,
    unseenCount,
    notifications,
    handleGetNotifications
  } = props.notificationFeatures

  useEffect(() => {
    if (notifications.length > 0) return
    handleGetNotifications()
  }, [handleGetNotifications, notifications])

  return (
    <FloatingActionButton
      count={unseenCount}
      vertical="bottom"
      horizontal="right"
      onClick={handleOpen}
    >
      <BellOutlined />
    </FloatingActionButton>
  )
}
