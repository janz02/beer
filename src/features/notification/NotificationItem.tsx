import './NotificationItem.scss'
import React, { FC, useState } from 'react'
import moment from 'moment'
import { List, Avatar } from 'antd'
import { BellFilled } from '@ant-design/icons'
import { MomentDisplay } from 'components/MomentDisplay'
import { useNotification } from './useNotification'
import { NotificationData } from 'models/notification'
import { useTranslation } from 'react-i18next'
import { ListItemMetaProps } from 'antd/lib/list'

interface NotificationItemProps {
  item: NotificationData
}

export const NotificatonItem: FC<NotificationItemProps> = props => {
  const { item } = props
  const { t } = useTranslation()
  const { handleInspectItem } = useNotification()
  const [hover, setHover] = useState(false)

  const meta: ListItemMetaProps = {
    title: t(`enum.noitfication-type.${item.type}`),
    description: (
      <MomentDisplay date={moment(item.createdDate)} mode={hover ? 'date time' : 'from now'} />
    )
  }

  return (
    <List.Item
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      className={`notification-item ${item.isSeen ? '' : 'notification-item--unread'}`}
      onClick={() => handleInspectItem(item)}
    >
      <List.Item.Meta avatar={<Avatar icon={<BellFilled />} />} {...meta} />
      {item.key}
    </List.Item>
  )
}
