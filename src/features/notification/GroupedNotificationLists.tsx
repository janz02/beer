import './GroupedNotificationLists.scss'
import React, { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useTranslation } from 'react-i18next'
import { UseNotificationFeatures } from './useNotification'
import moment from 'moment'
import { NotificationList } from './NotificationList'

interface GroupedNotificationListsProps {
  notificationFeatures: UseNotificationFeatures
}

export const GroupedNotificationLists: FC<GroupedNotificationListsProps> = props => {
  const { t } = useTranslation()
  const {
    filteredNotifications,
    handleGetNotifications,
    handleReadAll,
    canLoadMore
  } = props.notificationFeatures

  const yesterday = moment().subtract(1, 'day')

  const todayNotifications = filteredNotifications.filter(x => x.createdDate?.isSame(moment(), 'd'))
  const yesterdayNotifications = filteredNotifications.filter(x =>
    x.createdDate?.isSame(yesterday, 'd')
  )
  const earlierNotifications = filteredNotifications.filter(x =>
    x.createdDate?.isBefore(yesterday, 'd')
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
            loadMore={
              todayNotifications.length === filteredNotifications.length &&
              filteredNotifications.length !== 0
            }
            notificationFeatures={props.notificationFeatures}
          />
          <NotificationList
            groupName={t('notification.yesterday')}
            items={yesterdayNotifications}
            loadMore={yesterdayNotifications.length > 0 && earlierNotifications.length === 0}
            notificationFeatures={props.notificationFeatures}
          />
          <NotificationList
            groupName={
              earlierNotifications.length === filteredNotifications.length
                ? ' '
                : t('notification.earlier')
            }
            items={earlierNotifications}
            loadMore={earlierNotifications.length > 0 || filteredNotifications.length === 0}
            notificationFeatures={props.notificationFeatures}
          />
        </div>
      </InfiniteScroll>
    </div>
  )
}
