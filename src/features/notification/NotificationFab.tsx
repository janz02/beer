import React, { FC, useEffect } from 'react'
import { FloatingActionButton } from 'components/buttons/FloatingActionButton'
import { BellOutlined } from '@ant-design/icons'
import { useNotification } from './useNotification'

export const NotificationFab: FC = () => {
  const { handleOpen, unseenCount, notifications, handleGetNotifications } = useNotification()

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