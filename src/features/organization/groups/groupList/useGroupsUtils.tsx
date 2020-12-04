import React, { useCallback, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from '../../../../hooks/react-redux-hooks'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { groupsActions } from './groupsSlice'
import { useTableUtils, TableUtils, FilterMode, ColumnConfigParams } from 'hooks/useTableUtils'
import { useTranslation } from 'react-i18next'
import { ColumnType } from 'antd/lib/table'
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
  handleOpenCreatePage: () => void
}

export const useGroupsUtils = (): GroupsUtils => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { listParams, listState, groups } = useSelector((state: RootState) => state.groups)

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.organizationEditor), [])

  const handleOpenCreatePage = useCallback(() => {
    if (isEditorUser) {
      history.push('/organization/groups/new')
    }
  }, [isEditorUser])

    const columnParams = useMemo<ColumnConfigParams[]>(
        () => [
            {
        title: t('organization.groups.field.name'),
        key: 'name',
        cannotBeHidden: true,
        sort: true,
        filterMode: FilterMode.SEARCH,
        disableSearchHighlight: true,
        render: (value: string, group: Group): React.ReactNode => {
          return <Link to={`/organization/groups/${group.id}`}>{value}</Link>
        }
      },{
        title: t('organization.groups.field.profile-count'),
        key: 'profileCount',
        sort: true
      },
      {
        title: t('organization.groups.field.company-count'),
        key: 'companyCount',
        sort: true
      },
      {
        title: t('organization.groups.field.job-role-count'),
        key: 'jobRoleCount',
        sort: true
      },
      {
        title: t('organization.groups.field.permission-count'),
        key: 'permissionsCount',
        sort: true
      },
      {
        title: t('organization.groups.field.created-date'),
        key: 'createdDate',
        sort: true,
        width: '12rem',
        renderMode: 'date time',
        filterMode: FilterMode.DATEPICKER
      },
      {
        title: t('organization.groups.field.creator'),
        key: 'createdBy',
        sort: true,
        filterMode: FilterMode.SEARCH
      }
    ],
    [t]
  )

  const actionColumnParams = useMemo<Partial<ColumnConfigParams> | undefined>(
    () =>
      isEditorUser
        ? tableUtils.actionColumnConfig({
            render(record: Group) {
              return (
                <CrudButtons
                  onEdit={() => history.push(`/organization/groups/${record.id}`)}
                  onDelete={() => ({})}
                />
              )
            }
          }
        : undefined,
    [isEditorUser]
  )

  const tableUtils = useTableUtils<Group>({
    listParamsState: listParams,
    getDataAction: groupsActions.getGroups,
    columnParams,
    actionColumnParams
  })

  const columnOrderUtils = useColumnOrderUtils(tableUtils.columnsConfig, ColumnStorageName.GROUPS)

  const resetFilters = useCallback(() => {
    dispatch(groupsActions.resetGroupsFilters())
  }, [dispatch])

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
    tabBarActions,
    handleOpenCreatePage
  }
}
