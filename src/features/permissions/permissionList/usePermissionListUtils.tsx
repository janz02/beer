import { ColumnType } from 'antd/lib/table'
import { RootState } from 'app/rootReducer'
import { AddButton } from 'components/buttons/AddButton'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { FilterMode, useTableUtils } from 'hooks/useTableUtils'
import { CampaignPermission } from 'models/campaign/campaignPermission'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { getPermissions, resetPermissionFilters } from './permissionListSlice'
import { history } from 'router/router'

export interface PermissionListUtils {
  tableProps: ResponsiveTableProps
  headerOptions: JSX.Element
}

export const usePermissionListUtils = (): PermissionListUtils => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const resetFilters = useCallback(() => {
    dispatch(resetPermissionFilters())
  }, [dispatch])

  const { permissions, loading, listParams } = useSelector(
    (state: RootState) => state.permissionList
  )

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<CampaignPermission>({
    listParamsState: listParams,
    filterKeys: ['name'],
    getDataAction: getPermissions
  })

  const columnsConfig = useMemo(
    (): ColumnType<CampaignPermission>[] => [
      columnConfig({
        title: t('permission.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      actionColumnConfig({
        render(record: CampaignPermission) {
          return (
            <CrudButtons
              useRightCircleForView
              onView={() => history.push(`/permissions/${record.id}`)}
            />
          )
        }
      })
    ],
    [actionColumnConfig, columnConfig, t]
  )

  const columnOrderUtils = useColumnOrderUtils(columnsConfig, ColumnStorageName.PERMISSION)

  const tableProps = useMemo(
    () => ({
      loading,
      columns: columnOrderUtils.currentColumns,
      dataSource: addKeyProp(permissions),
      pagination: paginationConfig,
      onChange: handleTableChange
    }),
    [
      addKeyProp,
      columnOrderUtils.currentColumns,
      paginationConfig,
      handleTableChange,
      loading,
      permissions
    ]
  )

  const headerOptions = useMemo(
    () => (
      <>
        <ResetFiltersButton onClick={resetFilters} />
        <ColumnOrderDropdown {...columnOrderUtils} />
        <AddButton onClick={() => history.push(`/permissions/new`)}>
          {t('permission.list.add')}
        </AddButton>
      </>
    ),
    [columnOrderUtils, resetFilters, t]
  )

  return {
    tableProps,
    headerOptions
  }
}