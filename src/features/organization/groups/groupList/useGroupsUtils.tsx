import React, { useCallback, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from '../../../../hooks/react-redux-hooks'
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
import { Link } from 'react-router-dom'
import { history } from 'router/router'

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
      'profileCount',
      'companyCount',
      'jobRoleCount',
      'permissionsCount',
      'createdDate',
      'createdBy'
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
        filterMode: FilterMode.SEARCH,
        render: (value: string, group: Group): React.ReactNode => {
          return <Link to={`/organization/group/${group.id}`}>{value}</Link>
        }
      }),
      tableUtils.columnConfig({
        title: t('organization.groups.field.profile-count'),
        key: 'profileCount',
        sort: true
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
        key: 'permissionsCount',
        sort: true
      }),
      tableUtils.columnConfig({
        title: t('organization.groups.field.created-date'),
        key: 'createdDate',
        sort: true,
        width: '12rem',
        renderMode: 'date time',
        filterMode: FilterMode.DATEPICKER
      }),
      tableUtils.columnConfig({
        title: t('organization.groups.field.creator'),
        key: 'createdBy',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      isEditorUser
        ? tableUtils.actionColumnConfig({
            render(record: Group) {
              return (
                <CrudButtons
                  onEdit={() => history.push(`/organization/group/${record.id}`)}
                  onDelete={() => ({})}
                />
              )
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
