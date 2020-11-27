import './ProfileList.scss'
import React, { FC, useEffect, useMemo } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { ProfileListTab, profileListActions } from './profileListSlice'
import { useProfileListUtils } from './useProfileListUtils'
import { ResponsiveTabs, TabPanelTitle, TabPane } from 'components/responsive/tabs'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { Dropdown, Menu } from 'antd'
import { AddButton } from 'components/buttons/AddButton'
import { hasPermission } from 'services/jwt-reader'
import { DownOutlined } from '@ant-design/icons'
import { ExportButton } from 'components/buttons/ExportButton'
import { SettingsButton } from 'components/buttons/SettingsButton'
import { pageViewRoles } from 'services/roleHelpers'

export const ProfileList: FC = () => {
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
  } = useProfileListUtils()

  useEffect(() => {
    dispatch(profileListActions.getProfiles())
  }, [dispatch])

  const columnOrderUtils = useColumnOrderUtils(columnsConfig, ColumnStorageName.PROFILES)

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.profileEditor), [])

  const headerOptions = useMemo(() => {
    const menu = (
      <Menu>
        <Menu.Item>{t('profiles.new.bulk-upload')}</Menu.Item>
        <Menu.Item>{t('profiles.new.send-invitation')}</Menu.Item>
      </Menu>
    )

    return (
      <>
        {isEditorUser && (
          <Dropdown overlay={menu}>
            <AddButton>
              {t('profiles.new.new')} <DownOutlined />
            </AddButton>
          </Dropdown>
        )}
      </>
    )
  }, [isEditorUser, t])

  const tabBarActions = useMemo(() => {
    return (
      <>
        <ExportButton
          className="profiles-export-button"
          onClick={() => {
            dispatch(profileListActions.exportProfiles())
          }}
        />
        <SettingsButton />
        <ResetFiltersButton onClick={resetFilters} />
        <ColumnOrderDropdown {...columnOrderUtils} />
      </>
    )
  }, [dispatch, columnOrderUtils, resetFilters])

  const table = (
    <ResponsiveTable
      hasHeaderOffset
      {...{
        hasFixedColumn: true,
        loading: profilesLoading,
        columns: columnOrderUtils.currentColumns,
        dataSource: profiles.map((u, i) => ({ ...u, key: i })),
        pagination: tableUtils.paginationConfig,
        onChange: tableUtils.handleTableChange
      }}
    />
  )

  return (
    <ResponsiveCard
      disableAutoScale
      width="full"
      forTable
      paddedBottom
      floatingTitle={t('profiles.title')}
      floatingOptions={headerOptions}
    >
      <ResponsiveTabs
        type="card"
        defaultActiveKey={selectedTab}
        onChange={x => setSelectedTab(x as ProfileListTab)}
        tabBarExtraContent={tabBarActions}
      >
        <TabPane key="all" tab={<TabPanelTitle title={t('profiles.tab.all')} />}>
          {table}
        </TabPane>
        <TabPane
          key="waiting-for-approval"
          tab={<TabPanelTitle title={t('profiles.tab.waiting-for-approval')} />}
        >
          {table}
        </TabPane>
        <TabPane key="declined" tab={<TabPanelTitle title={t('profiles.tab.declined')} />}>
          {table}
        </TabPane>
      </ResponsiveTabs>
    </ResponsiveCard>
  )
}
