import React, { FC, useEffect } from 'react'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch } from 'hooks/react-redux-hooks'
import { jobRolesActions } from './jobRoleListSlice'
import { JobRoleListUtils } from './useJobRoleListUtils'

interface JobRolesTableProps {
  jobRoleListUtils: JobRoleListUtils
}

export const JobRolesTable: FC<JobRolesTableProps> = props => {
  const dispatch = useDispatch()
  const { currentColumns, tableUtils, jobRoles, jobRolesLoading } = props.jobRoleListUtils

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