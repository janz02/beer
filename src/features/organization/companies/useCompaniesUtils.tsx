import React, { useCallback, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from '../../../hooks/react-redux-hooks'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { companiesActions } from './companiesSlice'
import { useTableUtils, TableUtils, FilterMode, ColumnConfigParams } from 'hooks/useTableUtils'
import { useTranslation } from 'react-i18next'
import { ColumnType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { FeatureState } from 'models/featureState'
import { Company } from 'models/company'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { ActivenessSwitch } from 'components/ActivenessSwitch'
import { ExportButton } from 'components/buttons/ExportButton'
import { pageViewRoles } from 'services/roleHelpers'

export interface CompaniesUtils {
  currentColumns: ColumnType<Company>[]
  tableUtils: TableUtils<Company>
  companies: Company[]
  companiesLoading: boolean
  tabBarActions: JSX.Element
}

export const useCompaniesUtils = (): CompaniesUtils => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { listParams, listState, companies, savingStatusIds } = useSelector(
    (state: RootState) => state.companies
  )

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.organizationEditor), [])

  const columnParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('organization.companies.field.status'),
        filterMode: FilterMode.ACTIVE_INACTIVE,
        key: 'isActive',
        width: '7rem',
        cannotBeHidden: true,
        render(value: boolean, company: Company) {
          return (
            <ActivenessSwitch
              isActive={value}
              onChange={x => {
                dispatch(companiesActions.setCompanyStatus(company.id, x))
              }}
              loading={!!savingStatusIds[company.id]}
            />
          )
        }
      },
      {
        title: t('organization.companies.field.name'),
        key: 'name',
        cannotBeHidden: true,
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('organization.companies.field.profile-count'),
        key: 'profileCount',
        sort: true
      },
      {
        title: t('organization.companies.field.group-count'),
        key: 'groupCount',
        sort: true
      },
      {
        title: t('organization.companies.field.job-role-count'),
        key: 'jobRoleCount',
        sort: true
      },
      {
        title: t('organization.companies.field.campaign-count'),
        key: 'campaignCount',
        sort: true
      },
      {
        title: t('organization.companies.field.created-date'),
        key: 'createdDate',
        sort: true,
        width: '12rem',
        renderMode: 'date time',
        filterMode: FilterMode.DATEPICKER
      }
    ],
    [dispatch, t, savingStatusIds]
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

  const tableUtils = useTableUtils<Company>({
    listParamsState: listParams,
    getDataAction: companiesActions.getCompanies,
    columnParams,
    actionColumnParams
  })

  const resetFilters = useCallback(() => {
    dispatch(companiesActions.resetCompaniesFilters())
  }, [dispatch])

  const columnOrderUtils = useColumnOrderUtils(
    tableUtils.columnsConfig,
    ColumnStorageName.COMPANIES
  )

  const handleExport = useCallback((): void => {
    dispatch(companiesActions.exportCompanies())
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
    companies,
    companiesLoading: listState === FeatureState.Loading,
    tabBarActions
  }
}
