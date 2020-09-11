import React, { FC, useEffect, useState } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { userAccessActions } from '../userAccessSlice'
import { useUserAccessList } from './useUserAccessList'
import { ResponsiveTabs, TabPanelTitle, TabPane } from 'components/responsive/tabs'
import { ResetFiltersButton } from 'components/ResetFiltersButton'

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
    partnerLoading,
    resetFilters
  } = useUserAccessList()

  useEffect(() => {
    dispatch(userAccessActions.getNkmUsers())
    dispatch(userAccessActions.getPartnerUsers())
  }, [dispatch])

  const tabBarContent = <ResetFiltersButton onClick={resetFilters} />

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
        tabBarExtraContent={tabBarContent}
      >
        <TabPane key="nkm" tab={<TabPanelTitle title={t('user-access.nkm-users')} />}>
          <ResponsiveTable
            hasHeaderOffset
            {...{
              loading: nkmLoading,
              columns: nkmUsersColumnsConfig,
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
              columns: partnerUsersColumnsConfig,
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
