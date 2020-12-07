import React, { FC, useEffect } from 'react'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch } from 'hooks/react-redux-hooks'
import { groupsActions } from './groupsSlice'
import { GroupsUtils } from './useGroupsUtils'

interface GroupsTableProps {
  groupsUtils: GroupsUtils
}

export const GroupsTable: FC<GroupsTableProps> = props => {
  const dispatch = useDispatch()
  const { currentColumns, tableUtils, groups, groupsLoading } = props.groupsUtils

  useEffect(() => {
    dispatch(groupsActions.getGroups())
  }, [dispatch])

  return (
    <ResponsiveTable
      hasHeaderOffset
      {...{
        loading: groupsLoading,
        columns: currentColumns,
        dataSource: groups.map((u, i) => ({ ...u, key: i })),
        pagination: tableUtils.paginationConfig,
        onChange: tableUtils.handleTableChange
      }}
    />
  )
}
