import React, { useCallback, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from '../../../hooks/react-redux-hooks'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { groupsActions } from './groupsSlice'
import { useTableUtils, TableUtils, FilterMode } from 'hooks/useTableUtils'
import { useTranslation } from 'react-i18next'
import { ColumnsType, ColumnType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { FeatureState } from 'models/featureState'
import { Group } from 'models/group'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { ExportButton } from 'components/buttons/ExportButton'
import { pageViewRoles } from 'services/roleHelpers'

export interface GroupsUtils {
  currentColumns: ColumnType<Group>[]
  tableUtils: TableUtils<Group>
  groups: Group[]
  groupsLoading: boolean
  tabBarActions: JSX.Element
}

export const useGroupsUtils = (): GroupsUtils => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { listParams, listState, groups } = useSelector((state: RootState) => state.groups)

  const tableUtils = useTableUtils<Group>({
    listParamsState: listParams,
    filterKeys: [
      'name',
      'companyCount',
      'jobRoleCount',
      'permissionCount',
      'createdDate',
      'creator'
    ],
    getDataAction: groupsActions.getGroups
  })

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.organizationEditor), [])

  const columnsConfig: ColumnsType<Group> = useMemo(
    () => [
      tableUtils.columnConfig({
        title: t('organization.groups.field.name'),
        key: 'name',
        cannotBeHidden: true,
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      tableUtils.columnConfig({
        title: t('organization.groups.field.company-count'),
        key: 'companyCount',
        sort: true
      }),
      tableUtils.columnConfig({
        title: t('organization.groups.field.job-role-count'),
        key: 'jobRoleCount',
        sort: true
      }),
      tableUtils.columnConfig({
        title: t('organization.groups.field.permission-count'),
        key: 'permissionCount',
        sort: true
      }),
      tableUtils.columnConfig({
        title: t('organization.groups.field.created-date'),
        key: 'createdDate',
        sort: true,
        renderMode: 'date time',
        filterMode: FilterMode.DATEPICKER
      }),
      tableUtils.columnConfig({
        title: t('organization.groups.field.creator'),
        key: 'creator',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      isEditorUser
        ? tableUtils.actionColumnConfig({
            render() {
              return <CrudButtons onEdit={() => ({})} onDelete={() => ({})} />
            }
          })
        : {}
    ],
    [tableUtils, t, isEditorUser]
  )

  const resetFilters = useCallback(() => {
    dispatch(groupsActions.resetGroupsFilters())
  }, [dispatch])

  const columnOrderUtils = useColumnOrderUtils(columnsConfig, ColumnStorageName.GROUPS)

  const handleExport = useCallback((): void => {
    dispatch(groupsActions.exportGroups())
  }, [dispatch])

  const tabBarActions = useMemo(() => {
    return (
      <>
        <ExportButton onClick={handleExport} />
        <ResetFiltersButton onClick={resetFilters} />
        <ColumnOrderDropdown {...columnOrderUtils} />
      </>
    )
  }, [columnOrderUtils, resetFilters, handleExport])

  return {
    currentColumns: columnOrderUtils.currentColumns,
    tableUtils,
    groups,
    groupsLoading: listState === FeatureState.Loading,
    tabBarActions
  }
}
