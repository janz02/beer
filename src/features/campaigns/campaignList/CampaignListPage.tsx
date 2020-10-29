import React, { FC, useEffect } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { useCampaignListUtils, companyTabName, partnerTabName } from './useCampaignListUtils'
import { ResponsiveTabs, TabPanelTitle, TabPane } from 'components/responsive/tabs'
import { campaignListActions, CampaignListTab } from './campaignListSlice'

export const CampaignListPage: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const {
    companyCampaignHeaderOptions,
    companyCampaignTableProps,
    partnerCampaignHeaderOptions,
    partnerCampaignTableProps,
    tabBarExtraContent,
    selectedTab,
    setSelectedTab
  } = useCampaignListUtils()

  useEffect(() => {
    dispatch(campaignListActions.getCompanyCampaigns())
    dispatch(campaignListActions.getPartnerCampaigns())
  }, [dispatch])

  return (
    <ResponsiveCard
      disableAutoScale
      width="full"
      forTable
      paddedBottom
      floatingTitle={t('campaign-list.title')}
      floatingOptions={
        selectedTab === companyTabName ? companyCampaignHeaderOptions : partnerCampaignHeaderOptions
      }
    >
      <ResponsiveTabs
        type="card"
        defaultActiveKey={selectedTab}
        onChange={x => setSelectedTab(x as CampaignListTab)}
        tabBarExtraContent={tabBarExtraContent}
      >
        <TabPane
          key={companyTabName}
          tab={<TabPanelTitle title={t('campaign-list.company.title')} />}
        >
          <ResponsiveTable {...companyCampaignTableProps} />
        </TabPane>
        <TabPane
          key={partnerTabName}
          tab={<TabPanelTitle title={t('campaign-list.partner.title')} />}
        >
          <ResponsiveTable {...partnerCampaignTableProps} />
        </TabPane>
      </ResponsiveTabs>
    </ResponsiveCard>
  )
}
