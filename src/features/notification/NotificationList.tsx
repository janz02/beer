import './NotificationList.scss'
import React, { FC, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { List, Empty, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { NotificatonItem } from './NotificationItem'
import { useNotification } from './useNotification'

export const NotificationList: FC = () => {
  const { t } = useTranslation()

  const { notifications, loading, handleGetNotifications, canLoadMore } = useNotification()

  // const canLoad
  useEffect(() => {
    if (notifications.length > 0) return
    handleGetNotifications()
  }, [handleGetNotifications, notifications])

  const loadMoreButton = canLoadMore && (
    <Button
      className="notification-list__load-more-btn"
      type="dashed"
      onClick={handleGetNotifications}
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
      rowKey={item => `${item.id}`}
      locale={{
        emptyText: (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('notification.empty-list')} />
        )
      }}
      renderItem={item => <NotificatonItem item={item} />}
    />
  )

  return (
    <div className="infinite-list-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleGetNotifications}
        hasMore={canLoadMore}
        useWindow={false}
      >
        {notificationList}
      </InfiniteScroll>
    </div>
  )
}
