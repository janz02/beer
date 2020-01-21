import React, { FC, useEffect } from 'react'
import './notification.scss'
import InfiniteScroll from 'react-infinite-scroller'
import { List, Empty, Button } from 'antd'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'react-redux'
import { getNotifications } from './notificationSlice'
import { useTranslation } from 'react-i18next'
import { ListItem } from './NotificationItem'

interface NotificationListProps {
  onClick: () => any
}

export const NotificationList: FC<NotificationListProps> = props => {
  const { onClick } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const notifications = useSelector((state: RootState) => state.notification.notifications)
  const hasMoreNotifications = useSelector((state: RootState) => state.notification.hasMore)
  const loading = useSelector((state: RootState) => state.notification.loading)

  useEffect(() => {
    dispatch(getNotifications())
  }, [dispatch])

  const loadMore = (): void => {
    dispatch(getNotifications())
  }

  const canLoadMore = (): boolean => !loading && hasMoreNotifications

  const loadMoreButton = canLoadMore() && (
    <Button className="notification-list__load-more-btn" type="dashed" onClick={loadMore}>
      {t('notification.load-more')}
    </Button>
  )

  return (
    <div className="infinite-list-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={loadMore}
        hasMore={canLoadMore()}
        useWindow={false}
      >
        <List
          className="notification-list"
          itemLayout="vertical"
          dataSource={notifications}
          loadMore={loadMoreButton}
          loading={loading}
          rowKey={item => item.id}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={t('notification.empty-list')}
              />
            )
          }}
          renderItem={item => <ListItem {...{ item, onClick }} />}
        />
      </InfiniteScroll>
    </div>
  )
}
