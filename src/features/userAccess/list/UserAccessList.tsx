import React, { FC, useEffect, useState, useMemo } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { userAccessActions } from '../userAccessSlice'
import { useUserAccessList } from './useUserAccessList'
import { ResponsiveTabs, TabPanelTitle, TabPane } from 'components/responsive/tabs'
import { useColumnOrder } from 'components/table-columns/useColumnOrder'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'

export const UserAccessList: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState('nkm')
  const {
    partnerUsersColumnsConfig,
    nkmUsersColumnsConfig,
    nkmUsersTableUtils,
    partnerUsersTableUtils,
    nkmUsers,
    nkmLoading,
    partnerUsers,
    partnerLoading
  } = useUserAccessList()

  useEffect(() => {
    dispatch(userAccessActions.getNkmUsers())
    dispatch(userAccessActions.getPartnerUsers())
  }, [dispatch])

  const nkmColumnOrder = useColumnOrder(nkmUsersColumnsConfig, ColumnStorageName.USER_ACCESS_NKM)
  const partnerColumnOrder = useColumnOrder(
    partnerUsersColumnsConfig,
    ColumnStorageName.USER_ACCES_PARTNER
  )

  const tabBarActions = useMemo(
    () =>
      selectedTab === 'nkm' ? (
        <ColumnOrderDropdown {...nkmColumnOrder} />
      ) : (
        <ColumnOrderDropdown {...partnerColumnOrder} />
      ),
    [selectedTab, nkmColumnOrder, partnerColumnOrder]
  )

  return (
    <ResponsiveCard
      disableAutoScale
      width="full"
      forTable
      paddedBottom
      floatingTitle={t('user-access.user-access')}
    >
      <ResponsiveTabs
        type="card"
        defaultActiveKey={selectedTab}
        onChange={setSelectedTab}
        tabBarExtraContent={tabBarActions}
      >
        <TabPane key="nkm" tab={<TabPanelTitle title={t('user-access.nkm-users')} />}>
          <ResponsiveTable
            hasHeaderOffset
            {...{
              loading: nkmLoading,
              columns: nkmColumnOrder.currentColumns,
              dataSource: nkmUsers.map((u, i) => ({ ...u, key: i })),
              pagination: nkmUsersTableUtils.paginationConfig,
              onChange: nkmUsersTableUtils.handleTableChange
            }}
          />
        </TabPane>
        <TabPane key="partner" tab={<TabPanelTitle title={t('user-access.partner-users')} />}>
          <ResponsiveTable
            hasHeaderOffset
            {...{
              loading: partnerLoading,
              columns: partnerColumnOrder.currentColumns,
              dataSource: partnerUsers.map((u, i) => ({ ...u, key: i })),
              pagination: partnerUsersTableUtils.paginationConfig,
              onChange: partnerUsersTableUtils.handleTableChange
            }}
          />
        </TabPane>
      </ResponsiveTabs>
    </ResponsiveCard>
  )
}
