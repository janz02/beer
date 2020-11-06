import React, { FC, useEffect } from 'react'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch } from 'hooks/react-redux-hooks'
import { companiesActions } from './companiesSlice'
import { CompaniesUtils } from './useCompaniesUtils'

interface CompaniesTableProps {
  companiesUtils: CompaniesUtils
}

export const CompaniesTable: FC<CompaniesTableProps> = props => {
  const dispatch = useDispatch()
  const { currentColumns, tableUtils, companies, companiesLoading } = props.companiesUtils

  useEffect(() => {
    dispatch(companiesActions.getCompanies())
  }, [dispatch])

  return (
    <ResponsiveTable
      hasHeaderOffset
      {...{
        loading: companiesLoading,
        columns: currentColumns,
        dataSource: companies.map((u, i) => ({ ...u, key: i })),
        pagination: tableUtils.paginationConfig,
        onChange: tableUtils.handleTableChange
      }}
    />
  )
}
