import React, { FC, useMemo, useCallback } from 'react'
import { CouponListTabKey } from '../campaignListSlice'
import { ResponsiveTabs, TabPanelTitle, TabPane } from 'components/responsive/tabs'
import { CampaignListTable, CampaignListTableProps } from './CampaignListTable'
import {
  CarryOutOutlined,
  ClockCircleOutlined,
  LockOutlined,
  RocketOutlined,
  CompassOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Coupon } from 'models/coupon'
import { ColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'

interface CampaignListTabsProps {
  columnOrderUtils: Record<string, ColumnOrderUtils<Coupon>>
  tableProps: CampaignListTableProps
  activeTabKey: CouponListTabKey
  onTabChange: (key: CouponListTabKey) => void
  tabBarRightActions: JSX.Element
}

export const CampaignListTabs: FC<CampaignListTabsProps> = ({
  columnOrderUtils,
  tableProps,
  activeTabKey,
  onTabChange,
  tabBarRightActions
}) => {
  const { t } = useTranslation()

  const campaignListTabs = useMemo(
    () => [
      {
        key: CouponListTabKey.Waiting,
        title: t('coupon-list.pending-tab'),
        icon: <CarryOutOutlined />
      },
      {
        key: CouponListTabKey.Accepted,
        title: t('coupon-list.accepted-tab'),
        icon: <ClockCircleOutlined />
      },
      {
        key: CouponListTabKey.Closed,
        title: t('coupon-list.closed-tab'),
        icon: <LockOutlined />
      },
      {
        key: CouponListTabKey.Created,
        title: t('coupon-list.created-tab'),
        icon: <RocketOutlined />
      },
      {
        key: CouponListTabKey.All,
        title: t('coupon-list.all-tab'),
        icon: <CompassOutlined />
      }
    ],
    [t]
  )

  const handleTabChange = useCallback(
    (key: string) => {
      onTabChange(key as CouponListTabKey)
    },
    [onTabChange]
  )

  return (
    <ResponsiveTabs
      onChange={handleTabChange}
      type="card"
      activeKey={activeTabKey}
      tabBarExtraContent={tabBarRightActions}
    >
      {campaignListTabs.map(tab => (
        <TabPane // Do not move to it's own comp.
          key={tab.key}
          tab={
            <TabPanelTitle
              title={tab.title}
              icon={tab.icon}
              badgeProps={{ count: 0 }} // TODO badge count
            />
          }
        >
          <CampaignListTable
            {...tableProps}
            columnsConfig={columnOrderUtils[tab.key].currentColumns}
          />
        </TabPane>
      ))}
    </ResponsiveTabs>
  )
}
