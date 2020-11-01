import React, { useMemo, useState } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'react-redux'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { companiesActions } from '../companiesSlice'
import { useTableUtils, TableUtils, FilterMode } from 'hooks/useTableUtils'
import { useTranslation } from 'react-i18next'
import { ColumnsType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/coupon'
import { FeatureState } from 'models/featureState'
import { Company } from 'models/company'

interface CompaniesListUtils {
  columnsConfig: ColumnsType<Company>
  tableUtils: TableUtils<Company>
  companies: Company[]
  companiesLoading: boolean
  selectedTab: string
  setSelectedTab: (tab: string) => void
  resetFilters: () => void
}

export const useCompanyListUtils = (): CompaniesListUtils => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState<string>('nkm')

  const { listParams, listState, companies } = useSelector((state: RootState) => state.companies)

  const tableUtils = useTableUtils<Company>({
    listParamsState: listParams,
    filterKeys: ['name', 'profiles', 'groups', 'jobRoles', 'campaigns', 'dateOfCreation'],
    getDataAction: companiesActions.getCompanies
  })

  const columnsConfig: ColumnsType<Company> = useMemo(
    () => [
      tableUtils.columnConfig({
        title: t('organization.companies.field.status'),
        filterMode: FilterMode.ACTIVE_INACTIVE,
        key: 'isActive',
        width: '7rem'
      }),
      tableUtils.columnConfig({
        title: t('organization.companies.field.name'),
        key: 'name',
        // width: '35%',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      tableUtils.columnConfig({
        title: t('organization.companies.field.profiles'),
        key: 'profiles',
        sort: true
      }),
      tableUtils.columnConfig({
        title: t('organization.companies.field.groups'),
        key: 'groups',
        sort: true
      }),
      tableUtils.columnConfig({
        title: t('organization.companies.field.job-roles'),
        key: 'jobRoles',
        sort: true
      }),
      tableUtils.columnConfig({
        title: t('organization.companies.field.campaigns'),
        key: 'campaigns',
        sort: true
      }),
      hasPermission([Roles.Administrator])
        ? tableUtils.actionColumnConfig({
            render(company: Company) {
              return <CrudButtons onEdit={() => ({})} />
            }
          })
        : {}
    ],
    [tableUtils, t]
  )

  const resetFilters = (): void => {
    dispatch(companiesActions.resetCompaniesFilters())
  }

  return {
    columnsConfig,
    tableUtils,
    companies,
    companiesLoading: listState === FeatureState.Loading,
    resetFilters,
    selectedTab,
    setSelectedTab
  }
}
