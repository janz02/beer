import React, { useState } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { hasPermission } from 'services/jwt-reader'
import { useCategoryTab } from './campaignCategory/useCategoryTab'
import { useProductTab } from './products/useProductTab'
import { ResponsiveTabs, TabPane, TabPanelTitle } from 'components/responsive/tabs'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { Roles } from 'api/swagger/coupon'

export interface SettingsTab {
  key: string
  title: string
  roles: Roles[]
  headerOptions?: JSX.Element
  tabContent: JSX.Element
  icon: JSX.Element
  notificationCount: number
  resetFilters: () => void
}

export const SettingsPage: React.FC = () => {
  const allTabs = [useCategoryTab(), useProductTab()]
  const permittedTabs = allTabs.filter(tab => hasPermission(tab.roles))
  const [currentTabKey, setCurrentTabKey] = useState(permittedTabs[0]?.key)
  const currentTab = permittedTabs.find(x => x.key === currentTabKey)

  const tabBarExtraContent = <ResetFiltersButton onClick={() => currentTab?.resetFilters()} />

  return (
    <ResponsiveCard
      width="full"
      forTable
      disableAutoScale
      floatingTitle={currentTab?.title}
      floatingOptions={currentTab?.headerOptions}
    >
      <ResponsiveTabs
        onChange={setCurrentTabKey}
        type="card"
        activeKey={currentTabKey}
        tabBarExtraContent={tabBarExtraContent}
      >
        {permittedTabs.map(tab => (
          <TabPane
            key={tab.key}
            tab={
              <TabPanelTitle
                title={tab.title}
                icon={tab.icon}
                badgeProps={{ count: tab.notificationCount, size: 'default' }}
              />
            }
          >
            {tab?.tabContent}
          </TabPane>
        ))}
      </ResponsiveTabs>
    </ResponsiveCard>
  )
}
