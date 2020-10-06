import { ColumnType } from 'antd/lib/table'
import { RootState } from 'app/rootReducer'
import { AddButton } from 'components/buttons/AddButton'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { useColumnOrder } from 'components/table-columns/useColumnOrder'
import { FilterMode, useTableUtils } from 'hooks/useTableUtils'
import { CampaignPermission } from 'models/campaignPermission'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { getPermissions, resetPermissionFilters } from './permissionListSlice'
import { history } from 'router/router'

export interface UsePermissionListPageUtils {
  tableProps: ResponsiveTableProps
  headerOptions: JSX.Element
}

export const usePermissionListPage = (): UsePermissionListPageUtils => {
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

  const columnOrder = useColumnOrder(columnsConfig, ColumnStorageName.PERMISSION)

  const tableProps = useMemo(
    () => ({
      loading,
      columns: columnOrder.currentColumns,
      dataSource: addKeyProp(permissions),
      pagination: paginationConfig,
      onChange: handleTableChange
    }),
    [
      addKeyProp,
      columnOrder.currentColumns,
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
        <ColumnOrderDropdown {...columnOrder} />
        <AddButton onClick={() => history.push(`/permissions/new`)}>
          {t('permission.list.add')}
        </AddButton>
      </>
    ),
    [columnOrder, resetFilters, t]
  )

  return {
    tableProps,
    headerOptions
  }
}
