import React, { FC } from 'react'
import { FloatingActionButton } from 'components/buttons/FloatingActionButton'
import { BellFilled } from '@ant-design/icons'
import { ButtonProps } from 'antd/lib/button'
import { useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'

type NotificationFabProps = ButtonProps

export const NotificationFab: FC<NotificationFabProps> = props => {
  const { unreadCount } = useSelector((state: RootState) => state.notification)

  return (
    <FloatingActionButton
      count={unreadCount}
      vertical="bottom"
      horizontal="right"
      type="primary"
      {...props}
    >
      <BellFilled />
    </FloatingActionButton>
  )
}
