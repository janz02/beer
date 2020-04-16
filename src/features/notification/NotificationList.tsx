import React, { FC, useEffect } from 'react'
import './NotificationList.scss'
import InfiniteScroll from 'react-infinite-scroller'
import { List, Empty, Button } from 'antd'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { notificationActions } from './notificationSlice'
import { useTranslation } from 'react-i18next'
import { ListItem } from './NotificationItem'
import { FeatureState } from 'models/featureState'

interface NotificationListProps {
  onClick: () => any
}

export const NotificationList: FC<NotificationListProps> = props => {
  const { onClick } = props
  const { getNotifications } = notificationActions
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { notifications, hasMore, listState } = useSelector(
    (state: RootState) => state.notification
  )

  const loading = listState === FeatureState.Loading

  useEffect(() => {
    dispatch(getNotifications())
  }, [dispatch])

  const loadMore = (): void => {
    dispatch(getNotifications())
  }

  const canLoadMore = (): boolean => !loading && hasMore

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
