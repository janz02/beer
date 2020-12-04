import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { GroupEditorUtils } from '../useGroupEditorUtils'

interface GroupProfilesLayoutProps {
  groupEditorUtils: GroupEditorUtils
}

export const GroupProfilesLayout: FC<GroupProfilesLayoutProps> = ({ groupEditorUtils }) => {
  const {
    isProfilesLoading,
    profiles,
    profileColumnsUtils,
    profileTableUtils,
    profileTotalCount,
    profileHeaderOptions
  } = groupEditorUtils
  const { t } = useTranslation()

  return (
    <ResponsiveCard
      className="group-editor-form__profile-list"
      width="full"
      floatingTitle={t('organization.groups.profiles', {
        totalCount: profileTotalCount
      })}
      floatingOptions={profileHeaderOptions}
      forTable
    >
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
    </ResponsiveCard>
  )
}
