import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { GroupEditorUtils } from '../useGroupEditorUtils'
import styles from './GroupProfilesLayout.module.scss'

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
      className={styles.list}
      width="full"
      floatingTitle={t('organization.groups.profiles', {
        totalCount: profileTotalCount
      })}
      floatingOptions={profileHeaderOptions}
      forTable
    >
      <ResponsiveTable
        hasFixedColumn
        loading={isProfilesLoading}
        columns={profileColumnsUtils.currentColumns}
        dataSource={profiles}
        pagination={profileTableUtils.paginationConfig}
        scroll={{ x: true }}
        onChange={profileTableUtils.handleTableChange}
      />
    </ResponsiveCard>
  )
}
