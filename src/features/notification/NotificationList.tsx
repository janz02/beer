import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NotificationUtils } from './useNotificationUtils'
import { Button, List, Empty } from 'antd'

import { NotificationData } from 'models/notification'
import { NotificationItem } from './NotificationItem'

interface NotificationListProps {
  notificationUtils: NotificationUtils
  groupName: string
  items: NotificationData[]
  loadMore: boolean
}

export const NotificationList: FC<NotificationListProps> = props => {
  const { items, groupName, loadMore } = props
  const { t } = useTranslation()
  const { loading, handleGetNotifications, canLoadMore } = props.notificationUtils

  const loadMoreButton = canLoadMore && (
    <Button
      className="notification-list__load-more-btn"
      type="dashed"
      onClick={handleGetNotifications}
    >
      {t('notification.load-more')}
    </Button>
  )

  return items.length > 0 || loadMore ? (
    <List
      className="notification-list"
      itemLayout="vertical"
      dataSource={items}
      loadMore={loadMore ? loadMoreButton : null}
      loading={loading}
      header={groupName}
      rowKey={item => `${item.id}`}
      locale={{
        emptyText: (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('notification.empty-list')} />
        )
      }}
      renderItem={item => (
        <NotificationItem item={item} notificationUtils={props.notificationUtils} />
      )}
    />
  ) : null
}
