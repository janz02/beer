import React, { FC, useEffect } from 'react'
import { FloatingActionButton } from 'components/buttons/FloatingActionButton'
import { BellFilled } from '@ant-design/icons'
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
      type="primary"
      onClick={handleOpen}
    >
      <BellFilled />
    </FloatingActionButton>
  )
}
