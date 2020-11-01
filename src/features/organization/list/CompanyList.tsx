import React, { FC, useEffect, useMemo } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { companiesActions } from '../companiesSlice'
import { useCompanyListUtils } from './useCompanyListUtils'
import { ResponsiveTabs, TabPanelTitle, TabPane } from 'components/responsive/tabs'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'

export const CompaniesList: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const {
    columnsConfig,
    tableUtils,
    companies,
    companiesLoading,
    resetFilters,
    selectedTab,
    setSelectedTab
  } = useCompanyListUtils()

  useEffect(() => {
    dispatch(companiesActions.getCompanies())
  }, [dispatch])

  const columnOrderUtils = useColumnOrderUtils(columnsConfig, ColumnStorageName.COMPANIES)

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
      floatingTitle={t('organization.title')}
    >
      <ResponsiveTabs
        type="card"
        defaultActiveKey={selectedTab}
        onChange={x => setSelectedTab(x)}
        tabBarExtraContent={tabBarActions}
      >
        <TabPane key="nkm" tab={<TabPanelTitle title={t('organization.companies.title')} />}>
          <ResponsiveTable
            hasHeaderOffset
            {...{
              loading: companiesLoading,
              columns: columnOrderUtils.currentColumns,
              dataSource: companies.map((u, i) => ({ ...u, key: i })),
              pagination: tableUtils.paginationConfig,
              onChange: tableUtils.handleTableChange
            }}
          />
        </TabPane>
      </ResponsiveTabs>
    </ResponsiveCard>
  )
}
