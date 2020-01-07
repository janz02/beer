import React, { FC, useEffect } from 'react';
import './notification.scss';
import moment from 'moment';
import { List, Avatar, Empty, Button } from 'antd';
import { BellFilled } from '@ant-design/icons';
import { RootState } from 'app/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { inspectNotification, getNotifications } from './notificationSlice';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';

interface NotificationListProps {
  onClick: () => any;
}

export const NotificationList: FC<NotificationListProps> = props => {
  const { onClick } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state: RootState) => state.notification.notifications
  );
  const hasMoreNotifications = useSelector(
    (state: RootState) => state.notification.hasMore
  );
  const loading = useSelector((state: RootState) => state.notification.loading);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const inspectItem = (id: string) => {
    dispatch(inspectNotification(id));
    onClick();
  };

  const loadMore = () => {
    dispatch(getNotifications());
  };

  return (
    <div className="infinite-list-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!loading && hasMoreNotifications}
        useWindow={false}
      >
        <List
          className="notification-list"
          itemLayout="vertical"
          dataSource={notifications}
          loadMore={
            !loading &&
            hasMoreNotifications && (
              <Button
                className="notification-list__load-more-btn"
                type="dashed"
                onClick={loadMore}
              >
                {t('notification.load-more')}
              </Button>
            )
          }
          loading={loading}
          rowKey={item => item.id}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={t('notification.empty-list')}
              />
            ),
          }}
          renderItem={item => (
            <List.Item
              className={`notification-item ${
                item.read ? '' : 'notification-item--unread'
              }`}
              onClick={() => inspectItem(item.id)}
              actions={[
                // TODO: Locale translation for moment
                <div className="notification-item__date">
                  {item.deliveryTime ? moment(item.deliveryTime).fromNow() : ''}
                </div>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  item.image ? (
                    <Avatar src={item.image} />
                  ) : (
                    <Avatar icon={<BellFilled />} />
                  )
                }
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
