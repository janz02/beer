import './GroupedNotificationLists.scss'
import React, { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useTranslation } from 'react-i18next'
import { useNotification } from './useNotification'
import moment from 'moment'
import { NotificationList } from './NotificationList'

export const GroupedNotificationLists: FC = () => {
  const { t } = useTranslation()

  const { notifications, handleGetNotifications, handleReadAll, canLoadMore } = useNotification()

  const todayNotifications = notifications.filter(x => x.createdDate?.diff(moment(), 'day') === 0)

  const yesterdayNotifications = notifications.filter(
    x => x.createdDate?.diff(moment(), 'day') === -1
  )
  const earlierNotifications = notifications.filter(
    x => x.createdDate && x.createdDate?.diff(moment(), 'day') < -1
  )

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
          <NotificationList
            groupName={t('notification.today')}
            items={todayNotifications}
            loadMore={todayNotifications.length === notifications.length}
          />
          <NotificationList
            groupName={t('notification.yesterday')}
            items={yesterdayNotifications}
            loadMore={yesterdayNotifications.length === notifications.length}
          />
          <NotificationList
            groupName={
              earlierNotifications.length === notifications.length ? ' ' : t('notification.earlier')
            }
            items={earlierNotifications}
            loadMore
          />
        </div>
      </InfiniteScroll>
    </div>
  )
}
