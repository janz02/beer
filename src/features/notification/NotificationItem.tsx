import React, { FC } from 'react'
import './NotificationItem.scss'
import moment from 'moment'
import { List, Row, Col } from 'antd'
import { MomentDisplay } from 'components/MomentDisplay'
import { NotificationUtils } from './useNotificationUtils'
import { NotificationData } from 'models/notification'
import { useTranslation } from 'react-i18next'
import { ListItemMetaProps } from 'antd/lib/list'
import { NotificationType } from 'api/swagger/coupon'
import { EnvelopeIcon } from 'components/icons/EnvelopeIcon'

interface NotificationItemProps {
  notificationUtils: NotificationUtils
  item: NotificationData
}

export const NotificationItem: FC<NotificationItemProps> = props => {
  const { item } = props
  const { t } = useTranslation()
  const { handleInspectItem, handleNavigateItem } = props.notificationUtils

  const meta: ListItemMetaProps = {
    title: t(`enum.notification-type.${item.type}.title`, { ...item }),
    description: (
      <div>
        <Row className="notification-detail">
          {t(`enum.notification-type.${item.type}.detail`, {
            ...item,
            interpolation: { escapeValue: false }
          })}
        </Row>
        <Row justify="space-between">
          <Col className="notification-date">
            <MomentDisplay date={moment(item.createdDate)} mode="from now" />
          </Col>
          <Col>
            <EnvelopeIcon opened={item.isSeen} onClick={(e: Event) => handleInspectItem(e, item)} />
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <List.Item
      className={`notification-item ${item.isSeen ? '' : 'notification-item--unread'}`}
      onClick={() => handleNavigateItem(item)}
    >
      <List.Item.Meta {...meta} />
    </List.Item>
  )
}
