import React, { FC, useEffect } from 'react'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch } from 'hooks/react-redux-hooks'
import { jobRolesActions } from './jobRolesListSlice'
import { JobRolesUtils } from './useJobRolesListUtils'

interface JobRolesTableProps {
  jobRolesUtils: JobRolesUtils
}

export const JobRolesTable: FC<JobRolesTableProps> = props => {
  const dispatch = useDispatch()
  const { currentColumns, tableUtils, jobRoles, jobRolesLoading } = props.jobRolesUtils

  useEffect(() => {
    dispatch(jobRolesActions.getJobRoles())
  }, [dispatch])

  return (
    <ResponsiveTable
      hasHeaderOffset
      {...{
        loading: jobRolesLoading,
        columns: currentColumns,
        dataSource: jobRoles.map((u, i) => ({ ...u, key: i })),
        pagination: tableUtils.paginationConfig,
        onChange: tableUtils.handleTableChange
      }}
    />
  )
}
