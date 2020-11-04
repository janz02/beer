import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTabs, TabPane, TabPanelTitle } from 'components/responsive/tabs'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CompaniesTable } from './companies/CompaniesTable'
import { useCompaniesUtils } from './companies/useCompaniesUtils'

export const OrganizationPage: FC = () => {
  const { t } = useTranslation()
  const [currentTabKey, setCurrentTabKey] = useState('companies')
  const companiesUtils = useCompaniesUtils()

  return (
    <ResponsiveCard
      disableAutoScale
      width="full"
      forTable
      paddedBottom
      floatingTitle={t('organization.title')}
    >
      <ResponsiveTabs
        type="card"
        defaultActiveKey={currentTabKey}
        onChange={x => setCurrentTabKey(x)}
        tabBarExtraContent={companiesUtils.tabBarActions}
      >
        <TabPane key="companies" tab={<TabPanelTitle title={t('organization.companies.title')} />}>
          <CompaniesTable companiesUtils={companiesUtils} />
        </TabPane>
      </ResponsiveTabs>
    </ResponsiveCard>
  )
}
