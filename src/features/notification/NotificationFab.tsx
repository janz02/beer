import React, { FC } from 'react'
import { FloatingActionButton } from 'components/buttons/FloatingActionButton'
import { BellFilled } from '@ant-design/icons'
import { useNotification } from './useNotification'

export const NotificationFab: FC = () => {
  const { handleOpen, unreadCount } = useNotification()

  return (
    <FloatingActionButton
      count={unreadCount}
      vertical="bottom"
      horizontal="right"
      type="primary"
      onClick={handleOpen}
    >
      <BellFilled />
    </FloatingActionButton>
  )
}
