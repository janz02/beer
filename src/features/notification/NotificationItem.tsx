import './NotificationItem.scss'
import React, { FC, useState } from 'react'
import moment from 'moment'
import { List, Avatar } from 'antd'
import { BellFilled } from '@ant-design/icons'
import { MomentDisplay } from 'components/MomentDisplay'
import { useNotification } from './useNotification'
import { NotificationData } from 'models/notification'
import { NotificationType } from 'api/swagger/models'
import { useTranslation } from 'react-i18next'
import { ListItemMetaProps } from 'antd/lib/list'

interface NotificationItemProps {
  item: NotificationData
}

export const NotificatonItem: FC<NotificationItemProps> = props => {
  const { item } = props
  const { t } = useTranslation()
  const { inspectItem } = useNotification()
  const [hover, setHover] = useState(false)

  let meta: ListItemMetaProps = {}

  switch (item.type) {
    case NotificationType.CampaignMovedToWaitingState:
      meta = {
        title: t('notification.item.campaign-moved-to-waiting-state.title'),
        description: t('notification.item.campaign-moved-to-waiting-state.description')
      }
      break
    case NotificationType.PartnerContactRegistered:
      meta = {
        title: t('notification.item.partner-contact-registered.title'),
        description: t('notification.item.partner-contact-registered.description')
      }
      break
  }

  return (
    <List.Item
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      className={`notification-item ${item.isSeen ? '' : 'notification-item--unread'}`}
      onClick={() => inspectItem(item)}
      actions={[
        // eslint-disable-next-line react/jsx-key
        <div className="notification-item__date">
          <MomentDisplay date={moment(item.createdDate)} mode={hover ? 'date time' : 'from now'} />
        </div>
      ]}
    >
      <List.Item.Meta avatar={<Avatar icon={<BellFilled />} />} {...meta} />
      {item.key}
    </List.Item>
  )
}
