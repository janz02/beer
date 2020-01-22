import React, { FC } from 'react'
import moment from 'moment'
import { NotificationData, inspectNotification } from './notificationSlice'
import { useDispatch } from 'react-redux'
import { List, Avatar } from 'antd'
import { BellFilled } from '@ant-design/icons'

interface NotificationItemProps {
  item: NotificationData
  onClick: () => any
}

export const ListItem: FC<NotificationItemProps> = ({ item, onClick }) => {
  const dispatch = useDispatch()

  const inspectItem = (id: string): void => {
    dispatch(inspectNotification(id))
    onClick()
  }

  return (
    <List.Item
      className={`notification-item ${item.read ? '' : 'notification-item--unread'}`}
      onClick={() => inspectItem(item.id)}
      actions={[
        // TODO: Locale translation for moment
        // eslint-disable-next-line react/jsx-key
        <div className="notification-item__date">
          {item.deliveryTime ? moment(item.deliveryTime).fromNow() : ''}
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
