import './NotificationList.scss'
import React, { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { List, Empty, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { NotificationItem } from './NotificationItem'
import { useNotification } from './useNotification'
import { NotificationData } from 'models/notification'
import moment from 'moment'

export const NotificationList: FC = () => {
  const { t } = useTranslation()

  const {
    notifications,
    loading,
    handleGetNotifications,
    handleReadAll,
    canLoadMore
  } = useNotification()

  const loadMoreButton = canLoadMore && (
    <Button
      className="notification-list__load-more-btn"
      type="dashed"
      onClick={handleGetNotifications}
    >
      {t('notification.load-more')}
    </Button>
  )

  const notificationList = (groupName: string, groupedNotifications: NotificationData[], loadMore: boolean) => {
    return (
      groupedNotifications.length > 0 ?
        <List
          className="notification-list"
          itemLayout="vertical"
          dataSource={groupedNotifications}
          loadMore={loadMore ? loadMoreButton : null}
          loading={loading}
          header={groupName}
          rowKey={item => `${item.id}`}
          locale={{
            emptyText: (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('notification.empty-list')} />
            )
          }}
          renderItem={item => <NotificationItem item={item} />}
        /> : null)
  }

  const todayNotifications = notifications.filter(x => x.createdDate!.diff(moment(), 'day') === 0)
  const yesterdayNotifications = notifications.filter(x => x.createdDate!.diff(moment(), 'day') === -1)
  const earlierNotifications = notifications.filter(x => x.createdDate!.diff(moment(), 'day') < -1)

  const todayList = notificationList(t('notification.today'), todayNotifications, todayNotifications.length == notifications.length)
  const yesterdayList = notificationList(t('notification.yesterday'), yesterdayNotifications, earlierNotifications.length === 0)
  const earlierList = notificationList(earlierNotifications.length === notifications.length ? " " : t('notification.earlier'), earlierNotifications, true)


  return (
    <div className="infinite-list-root">
      <div className="infinite-list-header" onClick={handleReadAll}>
        <div className="infinite-list-header__action">{t('notification.read-all')}</div>
      </div>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleGetNotifications}
        hasMore={canLoadMore}
        useWindow={false}
      >
        <div className="infinite-list-container">
          {todayList}
          {yesterdayList}
          {earlierList}
        </div>
      </InfiniteScroll>
    </div>
  )
}
