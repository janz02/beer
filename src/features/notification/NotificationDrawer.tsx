import './NotificationDrawer.scss'
import React, { FC } from 'react'
import { Drawer, Button } from 'antd'
import { NotificationList } from './NotificationList'
import { useTranslation } from 'react-i18next'
import { useNotification } from './useNotification'
import { RtConnectionDot } from './RtConnectionDot'
import { EyeOutlined } from '@ant-design/icons'
import Tooltip, { TooltipProps } from 'antd/lib/tooltip'

const tooltipConfig: Partial<TooltipProps> = {
  mouseEnterDelay: 0.5,
  placement: 'bottomLeft',
  style: { marginLeft: '0.5rem' }
}

export const NotificationDrawer: FC = () => {
  const { t } = useTranslation()

  const { opened, handleClose, handleReadAll, unseenCount } = useNotification()

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
          <RtConnectionDot />
          {t('notification.notifications')}
        </span>
        <span className="notification-drawer__header__options">
          <Tooltip {...tooltipConfig} title={t('notification.read-all')}>
            <Button disabled={!unseenCount} onClick={handleReadAll}>
              <EyeOutlined />
            </Button>
          </Tooltip>
        </span>
      </div>
      <NotificationList />
    </Drawer>
  )
}
