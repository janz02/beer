import './NotificationDrawer.scss'
import React, { FC } from 'react'
import { Drawer, Tabs } from 'antd'
import { GroupedNotificationLists } from './GroupedNotificationLists'
import { useTranslation } from 'react-i18next'
import { NotificationUtils } from './useNotificationUtils'
import { NotificationFilterType } from './notificationSlice'

const TabPane = Tabs.TabPane

interface NotificationDrawerProps {
  notificationUtils: NotificationUtils
}

export const NotificationDrawer: FC<NotificationDrawerProps> = props => {
  const { t } = useTranslation()
  const { opened, activeFilter, handleClose, handleFilterChange } = props.notificationUtils

  return (
    <Drawer
      className="notification-drawer"
      visible={opened}
      onClose={handleClose}
      width={320}
      placement="right"
      closable
    >
      <div className="notification-drawer__header">
        <span className="notification-drawer__header__title">
          {t('notification.notifications')}
        </span>
      </div>
      <Tabs
        className="notification-drawer__header__tabs"
        defaultActiveKey={activeFilter}
        onChange={handleFilterChange}
      >
        <TabPane tab={t('notification.filter.all')} key={NotificationFilterType.All}>
          <GroupedNotificationLists notificationUtils={props.notificationUtils} />
        </TabPane>
        <TabPane tab={t('notification.filter.unread')} key={NotificationFilterType.UnRead}>
          <GroupedNotificationLists notificationUtils={props.notificationUtils} />
        </TabPane>
        <TabPane tab={t('notification.filter.read')} key={NotificationFilterType.Read}>
          <GroupedNotificationLists notificationUtils={props.notificationUtils} />
        </TabPane>
      </Tabs>
    </Drawer>
  )
}
