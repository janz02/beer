import React, { FC, useState } from 'react'
import moment from 'moment'
import { NotificationData, inspectNotification } from './notificationSlice'
import { useDispatch } from 'hooks/react-redux-hooks'
import { List, Avatar } from 'antd'
import { BellFilled } from '@ant-design/icons'
import { MomentDisplay } from 'components/MomentDisplay'

interface NotificationItemProps {
  item: NotificationData
  onClick: () => any
}

export const ListItem: FC<NotificationItemProps> = ({ item, onClick }) => {
  const dispatch = useDispatch()

  const [hover, setHover] = useState(false)

  const inspectItem = (id: string): void => {
    dispatch(inspectNotification(id))
    onClick()
  }

  return (
    <List.Item
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      className={`notification-item ${item.read ? '' : 'notification-item--unread'}`}
      onClick={() => inspectItem(item.id)}
      actions={[
        // eslint-disable-next-line react/jsx-key
        <div className="notification-item__date">
          <MomentDisplay date={moment(item.deliveryTime)} mode={hover ? 'date time' : 'from now'} />
        </div>
      ]}
    >
      <List.Item.Meta
        avatar={item.image ? <Avatar src={item.image} /> : <Avatar icon={<BellFilled />} />}
        title={item.title}
        description={item.description}
      />
    </List.Item>
  )
}
