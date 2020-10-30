import React, { FC, useEffect, useMemo } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { profilesActions } from '../profilesSlice'
import { useProfilesListUtils } from './useProfilesListUtils'
import { ResponsiveTabs, TabPanelTitle, TabPane } from 'components/responsive/tabs'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'

export const ProfilesList: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const {
    columnsConfig,
    tableUtils,
    profiles,
    profilesLoading,
    resetFilters,
    selectedTab,
    setSelectedTab
  } = useProfilesListUtils()

  useEffect(() => {
    dispatch(profilesActions.getProfiles())
  }, [dispatch])

  const columnOrderUtils = useColumnOrderUtils(columnsConfig, ColumnStorageName.PROFILES)

  const tabBarActions = useMemo(() => {
    return (
      <>
        <ResetFiltersButton onClick={resetFilters} />
        <ColumnOrderDropdown {...columnOrderUtils} />
      </>
    )
  }, [columnOrderUtils, resetFilters])

  return (
    <ResponsiveCard
      disableAutoScale
      width="full"
      forTable
      paddedBottom
      floatingTitle={t('profiles.title')}
    >
      <ResponsiveTabs
        type="card"
        defaultActiveKey={selectedTab}
        onChange={x => setSelectedTab(x)}
        tabBarExtraContent={tabBarActions}
      >
        <TabPane key="nkm" tab={<TabPanelTitle title={t('profiles.tab')} />}>
          <ResponsiveTable
            hasHeaderOffset
            {...{
              loading: profilesLoading,
              columns: columnOrderUtils.currentColumns,
              dataSource: profiles.map((u, i) => ({ ...u, key: i })),
              pagination: tableUtils.paginationConfig,
              onChange: tableUtils.handleTableChange
            }}
          />
        </TabPane>
      </ResponsiveTabs>
    </ResponsiveCard>
  )
}
