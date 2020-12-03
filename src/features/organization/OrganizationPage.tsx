import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import { AddButton } from 'components/buttons/AddButton'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTabs, TabPane, TabPanelTitle } from 'components/responsive/tabs'
import { useParams } from 'hooks/react-router-dom-hooks'
import React, { FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { hasPermission } from 'services/jwt-reader'
import { pageViewRoles } from 'services/roleHelpers'
import { CompaniesTable } from './companies/CompaniesTable'
import { useCompaniesUtils } from './companies/useCompaniesUtils'
import { GroupsTable } from './groups/groupList/GroupsTable'
import { useGroupsUtils } from './groups/groupList/useGroupsUtils'
import { JobRolesTable } from './jobRoles/JobRolesTable'
import { useJobRoleListUtils } from './jobRoles/useJobRoleListUtils'

export const OrganizationPage: FC = () => {
  const { t } = useTranslation()
  const { tab } = useParams()
  const [currentTabKey, setCurrentTabKey] = useState(tab ?? 'companies')
  const companiesUtils = useCompaniesUtils()
  const groupsUtils = useGroupsUtils()
  const jobRoleListUtils = useJobRoleListUtils()

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.organizationEditor), [])

  const headerOptions = useMemo(() => {
    const menu = (
      <Menu>
        <Menu.Item>{t('organization.new.company')}</Menu.Item>
        <Menu.Item onClick={() => groupsUtils.handleOpenCreatePage()}>
          {t('organization.new.group')}
        </Menu.Item>
        <Menu.Item>{t('organization.new.job-role')}</Menu.Item>
      </Menu>
    )

    return (
      <>
        {isEditorUser && (
          <Dropdown overlay={menu}>
            <AddButton>
              {t('organization.new.new')} <DownOutlined />
            </AddButton>
          </Dropdown>
        )}
      </>
    )
  }, [t, groupsUtils, isEditorUser])

  let tabBarActions: JSX.Element | undefined
  switch (currentTabKey) {
    case 'companies':
      tabBarActions = companiesUtils.tabBarActions
      break
    case 'groups':
      tabBarActions = groupsUtils.tabBarActions
      break
    case 'job-roles':
      tabBarActions = jobRoleListUtils.tabBarActions
      break
  }

  return (
    <ResponsiveCard
      disableAutoScale
      width="full"
      forTable
      paddedBottom
      floatingTitle={t('organization.title')}
      floatingOptions={headerOptions}
    >
      <ResponsiveTabs
        type="card"
        defaultActiveKey={currentTabKey}
        onChange={x => setCurrentTabKey(x)}
        tabBarExtraContent={tabBarActions}
      >
        <TabPane key="companies" tab={<TabPanelTitle title={t('organization.companies.title')} />}>
          <CompaniesTable companiesUtils={companiesUtils} />
        </TabPane>
        <TabPane key="groups" tab={<TabPanelTitle title={t('organization.groups.title')} />}>
          <GroupsTable groupsUtils={groupsUtils} />
        </TabPane>
        <TabPane key="job-roles" tab={<TabPanelTitle title={t('organization.job-roles.title')} />}>
          <JobRolesTable jobRoleListUtils={jobRoleListUtils} />
        </TabPane>
      </ResponsiveTabs>
    </ResponsiveCard>
  )
}
