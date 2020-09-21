import React, { useEffect, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { CampaignPermission } from 'models/campaignPermission'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { getPermissions, resetPermissionFilters } from './permissionListSlice'
import { ColumnType } from 'antd/lib/table'
import { ColumnFilterItem } from 'antd/lib/table/interface'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { history } from 'router/router'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { useColumnOrder } from 'components/table-columns/useColumnOrder'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'

export const PermissionListPage: React.FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const { permissions, loading, listParams } = useSelector(
    (state: RootState) => state.permissionList
  )

  useEffect(() => {
    dispatch(getPermissions())
  }, [dispatch])

  const { paginationConfig, columnConfig, actionColumnConfig, addKeyProp } = useTableUtils<
    CampaignPermission
  >({
    listParamsState: listParams,
    filterKeys: ['name'],
    getDataAction: getPermissions
  })

  const resetFilters = (): void => {
    dispatch(resetPermissionFilters())
  }

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

  const columnOrder = useColumnOrder(columnsConfig, ColumnStorageName.PARTNER)

  const headerOptions = (
    <>
      <ResetFiltersButton onClick={resetFilters} />
      <ColumnOrderDropdown {...columnOrder} />
      <AddButton onClick={() => history.push(`/permissions/new`)}>
        {t('permission.list.add')}
      </AddButton>
    </>
  )

  return (
    <>
      <ResponsiveCard
        floatingTitle={t('permission.list.title')}
        floatingOptions={headerOptions}
        forTable
      >
        <ResponsiveTable
          {...{
            loading,
            columns: columnOrder.currentColumns,
            dataSource: addKeyProp(permissions),
            pagination: paginationConfig
          }}
        />
      </ResponsiveCard>
    </>
  )
}
