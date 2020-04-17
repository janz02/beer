import React, { FC, useEffect } from 'react'
import './NotificationList.scss'
import InfiniteScroll from 'react-infinite-scroller'
import { List, Empty, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { ListItem } from './NotificationItem'
import { useNotificationList } from './useNotificationList'

interface NotificationListProps {
  onClick: () => void
}

export const NotificationList: FC<NotificationListProps> = props => {
  const { onClick } = props
  const { t } = useTranslation()

  const { notifications, loading, handeGetNotifications, canLoadMore } = useNotificationList()

  useEffect(() => {
    handeGetNotifications()
  }, [handeGetNotifications])

  const loadMoreButton = canLoadMore && (
    <Button
      className="notification-list__load-more-btn"
      type="dashed"
      onClick={handeGetNotifications}
    >
      {t('notification.load-more')}
    </Button>
  )

  const notificationList = (
    <List
      className="notification-list"
      itemLayout="vertical"
      dataSource={notifications}
      loadMore={loadMoreButton}
      loading={loading}
      rowKey={item => item.id}
      locale={{
        emptyText: (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('notification.empty-list')} />
        )
      }}
      renderItem={item => <ListItem {...{ item, onClick }} />}
    />
  )

  return (
    <div className="infinite-list-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handeGetNotifications}
        hasMore={canLoadMore}
        useWindow={false}
      >
        {notificationList}
      </InfiniteScroll>
    </div>
  )
}
