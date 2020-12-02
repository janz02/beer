import { Row } from 'antd'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import React, { FC } from 'react'
import { GroupEditorUtils } from '../useGroupEditorUtils'

interface GroupProfilesLayoutProps {
  groupEditorUtils: GroupEditorUtils
}

export const GroupProfilesLayout: FC<GroupProfilesLayoutProps> = ({ groupEditorUtils }) => {
  const { isProfilesLoading, profiles, profileColumnsUtils, profileTableUtils } = groupEditorUtils

  return (
    <Row>
      <ResponsiveTable
        hasHeaderOffset
        {...{
          hasFixedColumn: true,
          loading: isProfilesLoading,
          columns: profileColumnsUtils.currentColumns,
          dataSource: profiles!.map((u, i) => ({ ...u, key: i })),
          pagination: profileTableUtils.paginationConfig,
          onChange: profileTableUtils.handleTableChange
        }}
      />
    </Row>
  )
}
