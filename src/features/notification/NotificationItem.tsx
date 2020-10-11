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
    description: (
      <Row justify="space-between">
        <Col className="notification-date">
          <MomentDisplay date={moment(item.createdDate)} mode="from now" />
        </Col>
        <Col>
          <EnvelopeIcon opened={item.isSeen} onClick={(e: Event) => handleInspectItem(e, item)} />
        </Col>
      </Row>
    )
  }

  switch (item.type) {
    case NotificationType.CampaignMovedToWaitingState:
      meta.title = t(`enum.notification-type.${item.type}`)
      break
    case NotificationType.PartnerContactRegistered:
      meta.title = `${t(`enum.notification-type.${item.type}`)} ${item.value}`
      break
    case NotificationType.CouponClosed:
      meta.title = t(`enum.notification-type.${item.type}`)
      break
    case NotificationType.CouponCountDepleted:
      meta.title = t(`enum.notification-type.${item.type}`)
      break
    default:
      meta.title = t(`enum.notification-type.${item.type}`)
      break
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
