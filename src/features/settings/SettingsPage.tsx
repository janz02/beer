import React, { useState } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { hasPermission } from 'services/jwt-reader'
import { useCategoryTab } from './campaignCategory/useCategoryTab'
import { pageViewRoles } from 'services/roleHelpers'

export interface SettingsTab {
  headerOptions?: JSX.Element
  tabContent: JSX.Element
}

const tabDefinitions = [
  {
    key: 'campaign-categories',
    tab: 'settings.campaign-categories',
    roles: pageViewRoles.categories
  }
]

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation()
  const categoryTab = useCategoryTab()

  const tabList = tabDefinitions
    .filter(x => hasPermission(x.roles))
    .map(x => ({
      key: x.key,
      tab: t(x.tab)
    }))

  const [currentTabKey, setCurrentTabKey] = useState(tabList[0]?.key)

  let currentTab: SettingsTab | undefined
  switch (currentTabKey) {
    case 'campaign-categories':
      currentTab = categoryTab
      break

    default:
      break
  }

  return (
    <ResponsiveCard
      width="full"
      forTable
      floatingTitle={t('settings.title')}
      floatingOptions={currentTab?.headerOptions}
      tabList={tabList}
      onTabChange={setCurrentTabKey}
    >
      {currentTab?.tabContent}
    </ResponsiveCard>
  )
}
