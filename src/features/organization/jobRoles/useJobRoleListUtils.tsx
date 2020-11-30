import React, { useCallback, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from '../../../hooks/react-redux-hooks'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { jobRolesActions } from './jobRoleListSlice'
import { useTableUtils, TableUtils, FilterMode, ColumnConfigParams } from 'hooks/useTableUtils'
import { useTranslation } from 'react-i18next'
import { ColumnType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { FeatureState } from 'models/featureState'
import { JobRole } from 'models/jobRole'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { ExportButton } from 'components/buttons/ExportButton'
import { pageViewRoles } from 'services/roleHelpers'

export interface JobRoleListUtils {
  currentColumns: ColumnType<JobRole>[]
  tableUtils: TableUtils<JobRole>
  jobRoles: JobRole[]
  jobRolesLoading: boolean
  tabBarActions: JSX.Element
}

export const useJobRoleListUtils = (): JobRoleListUtils => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { listParams, listState, jobRoles } = useSelector((state: RootState) => state.jobRoleList)

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.organizationEditor), [])

  const columnParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('organization.job-roles.field.name'),
        key: 'name',
        cannotBeHidden: true,
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('organization.job-roles.field.profile-count'),
        key: 'profileCount',
        sort: true
      },
      {
        title: t('organization.job-roles.field.company-count'),
        key: 'companyCount',
        sort: true
      },
      {
        title: t('organization.job-roles.field.group-count'),
        key: 'groupCount',
        sort: true
      },
      {
        title: t('organization.job-roles.field.created-date'),
        key: 'createdDate',
        sort: true,
        width: '12rem',
        renderMode: 'date time',
        filterMode: FilterMode.DATEPICKER
      },
      {
        title: t('organization.job-roles.field.created-by'),
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
        ? {
            render() {
              return <CrudButtons onEdit={() => ({})} onDelete={() => ({})} />
            }
          }
        : undefined,
    [isEditorUser]
  )

  const tableUtils = useTableUtils<JobRole>({
    listParamsState: listParams,
    getDataAction: jobRolesActions.getJobRoles,
    columnParams,
    actionColumnParams
  })

  const resetFilters = useCallback(() => {
    dispatch(jobRolesActions.resetJobRolesFilters())
  }, [dispatch])

  const columnOrderUtils = useColumnOrderUtils(
    tableUtils.columnsConfig,
    ColumnStorageName.JOB_ROLES
  )

  const handleExport = useCallback((): void => {
    dispatch(jobRolesActions.exportJobRoles())
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
    jobRoles,
    jobRolesLoading: listState === FeatureState.Loading,
    tabBarActions
  }
}
