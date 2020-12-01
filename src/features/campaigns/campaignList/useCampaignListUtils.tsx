import React, { useCallback, useMemo, useState } from 'react'
import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { campaignListActions, CampaignListTab } from './campaignListSlice'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { useTranslation } from 'react-i18next'
import { ColumnsType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { CampaignListItem } from 'models/campaign/campaignListItem'
import { history } from 'router/router'
import { pageViewRoles } from 'services/roleHelpers'
import { AddButton } from 'components/buttons/AddButton'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { ExportButton } from 'components/buttons/ExportButton'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { CampaignStatus } from 'models/campaign/campaignStatus'
import { ColumnFilterItem } from 'antd/lib/table/interface'
import { MomentDisplay } from 'components/MomentDisplay'
import moment from 'moment'
import { SettingsButton } from 'components/buttons/SettingsButton'

interface CampaignListUtils {
  companyCampaignTableProps: ResponsiveTableProps
  companyCampaignHeaderOptions: JSX.Element
  partnerCampaignTableProps: ResponsiveTableProps
  partnerCampaignHeaderOptions: JSX.Element
  tabBarExtraContent: React.ReactNode
  selectedTab: CampaignListTab
  setSelectedTab: (tab: CampaignListTab) => void
}

export const companyTabName = 'company'
export const partnerTabName = 'partner'

export const useCampaignListUtils = (): CampaignListUtils => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState<CampaignListTab>(companyTabName)
  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.campaignEditor), [])
  const isCompanyCampaign = useMemo(() => selectedTab === companyTabName, [selectedTab])

  const {
    companyCampaigns,
    partnerCampaigns,
    companyListParams,
    partnerListParams,
    products,
    channels,
    loading
  } = useSelector((state: RootState) => state.campaignList)

  const companyCampaignTableUtils = useTableUtils<CampaignListItem>({
    listParamsState: companyListParams,
    filterKeys: [
      'name',
      'statusId',
      'typeId',
      'startDate',
      'segmentation',
      'productId',
      'createdBy',
      'channelId',
      'responsible',
      'createdDate'
    ],
    getDataAction: campaignListActions.getCompanyCampaigns
  })

  const companyCampaignColumnsConfig: ColumnsType<CampaignListItem> = useMemo(
    () => [
      companyCampaignTableUtils.columnConfig({
        title: t('campaign-list.field.status'),
        key: 'statusId',
        sort: true,
        ellipsis: false,
        cannotBeHidden: true,
        filterMode: FilterMode.ENUM,
        filters:
          Object.keys(CampaignStatus)
            .filter(x => !isNaN(+x))
            .map(x => {
              return {
                text: +x ? t('campaign-status.' + CampaignStatus[+x].toLowerCase()) : null,
                value: +x
              } as ColumnFilterItem
            }) ?? [],
        render(value: string) {
          return +value ? t('campaign-status.' + CampaignStatus[+value].toLowerCase()) : null
        }
      }),
      companyCampaignTableUtils.columnConfig({
        title: t('campaign-list.field.name'),
        key: 'name',
        sort: true,
        cannotBeHidden: true,
        filterMode: FilterMode.SEARCH,
        disableSearchHighlight: true,
        ellipsis: false,
        render: (value: string, campaign: CampaignListItem): React.ReactNode => {
          return <a href={`/campaigns/${campaign.id}`}>{value}</a>
        }
      }),
      companyCampaignTableUtils.columnConfig({
        title: t('campaign-list.field.type'),
        key: 'channelId',
        sort: true,
        ellipsis: false,
        filterMode: FilterMode.ENUM,
        filters:
          channels?.map(x => {
            return {
              text: x.name && t('campaign-channel.' + x.name?.toLowerCase()),
              value: x.id?.toString()
            } as ColumnFilterItem
          }) ?? [],
        render(value: string, campaign: CampaignListItem) {
          const campaignChannels = campaign.channels?.map(
            x => channels && channels.find(channel => channel.id === x)?.name
          )
          if (campaignChannels && campaignChannels.length > 0) {
            return campaignChannels
              .map(x => x && t('campaign-channel.' + x.toLowerCase()))
              .join(', ')
          }
        }
      }),
      companyCampaignTableUtils.columnConfig({
        title: t('campaign-list.field.timing'),
        key: 'startDate',
        sort: true,
        ellipsis: false,
        filterMode: FilterMode.DATERANGEPICKER,
        render: (value: moment.Moment, campaign: CampaignListItem): React.ReactNode => {
          return (
            <>
              <MomentDisplay date={campaign.startDate} />
              <br />
              {campaign.endDate ? <MomentDisplay date={campaign.endDate} /> : undefined}
            </>
          )
        }
      }),
      companyCampaignTableUtils.columnConfig({
        title: t('campaign-list.field.segmentation'),
        key: 'segmentation',
        sort: true,
        ellipsis: false,
        filterMode: FilterMode.FILTER
      }),
      companyCampaignTableUtils.columnConfig({
        title: t('campaign-list.field.product'),
        key: 'productId',
        sort: true,
        ellipsis: false,
        filterMode: FilterMode.FILTER,
        filters:
          products?.map(x => {
            return { text: x.name, value: x.id?.toString() } as ColumnFilterItem
          }) ?? [],
        render(value: string) {
          return products && products.find(x => x.id === +value)?.name
        }
      }),
      companyCampaignTableUtils.columnConfig({
        title: t('campaign-list.field.requestor'),
        key: 'createdBy',
        sort: true,
        ellipsis: false,
        filterMode: FilterMode.SEARCH
      }),
      companyCampaignTableUtils.columnConfig({
        title: t('campaign-list.field.createdDate'),
        key: 'createdDate',
        sort: true,
        ellipsis: false,
        filterMode: FilterMode.DATERANGEPICKER
      }),
      companyCampaignTableUtils.columnConfig({
        title: t('campaign-list.field.responsible'),
        key: 'responsible',
        sort: true,
        ellipsis: false,
        filterMode: FilterMode.SEARCH,
        hiddenByDefault: true
      }),
      companyCampaignTableUtils.columnConfig({
        title: t('campaign-list.field.modifiedDate'),
        key: 'modifiedDate',
        sort: true,
        ellipsis: false,
        filterMode: FilterMode.DATEPICKER,
        hiddenByDefault: true
      }),
      isEditorUser
        ? companyCampaignTableUtils.actionColumnConfig({
            fixed: 'right',
            width: 'auto',
            render(campaign: CampaignListItem) {
              return (
                <CrudButtons
                  onEdit={
                    isEditorUser ? () => history.push(`/campaigns/${campaign.id}`) : undefined
                  }
                  onDelete={
                    isEditorUser && campaign.id && campaign.canDelete
                      ? () => {
                          dispatch(campaignListActions.deleteCompanyCampaign(campaign.id!))
                        }
                      : undefined
                  }
                />
              )
            }
          })
        : {}
    ],
    [t, dispatch, companyCampaignTableUtils, isEditorUser, products, channels]
  )

  const companyColumnOrderUtils = useColumnOrderUtils(
    companyCampaignColumnsConfig,
    ColumnStorageName.CAMPAIGN_COMPANY
  )

  const companyCampaignSource = useMemo(
    () => companyCampaignTableUtils.addKeyProp(companyCampaigns),
    [companyCampaignTableUtils, companyCampaigns]
  )

  const companyCampaignTableProps: ResponsiveTableProps = useMemo(
    () => ({
      loading,
      hasHeaderOffset: true,
      hasFixedColumn: true,
      columns: companyColumnOrderUtils.currentColumns,
      dataSource: companyCampaignSource,
      pagination: companyCampaignTableUtils.paginationConfig,
      onChange: companyCampaignTableUtils.handleTableChange
    }),
    [loading, companyColumnOrderUtils, companyCampaignSource, companyCampaignTableUtils]
  )

  const companyCampaignHeaderOptions = useMemo(
    () =>
      isEditorUser ? (
        <AddButton onClick={() => history.push(`/campaigns/new`)}>
          {t('campaign-list.company.add')}
        </AddButton>
      ) : (
        <></>
      ),
    [isEditorUser, t]
  )

  const partnerCampaignTableUtils = useTableUtils<CampaignListItem>({
    listParamsState: partnerListParams,
    filterKeys: [
      'name',
      'statusId',
      'typeId',
      'startDate',
      'segmentation',
      'productId',
      'createdBy',
      'responsible',
      'createdDate',
      'modifiedDate'
    ],
    getDataAction: campaignListActions.getPartnerCampaigns
  })

  const partnerColumnOrderUtils = useColumnOrderUtils(
    companyCampaignColumnsConfig,
    ColumnStorageName.CAMPAIGN_PARTNER
  )

  const partnerCampaignSource = useMemo(
    () => companyCampaignTableUtils.addKeyProp(partnerCampaigns),
    [companyCampaignTableUtils, partnerCampaigns]
  )

  const partnerCampaignTableProps: ResponsiveTableProps = useMemo(
    () => ({
      hasHeaderOffset: true,
      hasFixedColumn: true,
      loading,
      columns: partnerColumnOrderUtils.currentColumns,
      dataSource: partnerCampaignSource,
      pagination: partnerCampaignTableUtils.paginationConfig,
      onChange: partnerCampaignTableUtils.handleTableChange
    }),
    [loading, partnerColumnOrderUtils, partnerCampaignSource, partnerCampaignTableUtils]
  )

  const partnerCampaignHeaderOptions = useMemo(
    () =>
      isEditorUser ? (
        <AddButton onClick={() => history.push(`/campaigns/new`)}>
          {t('campaign-list.partner.add')}
        </AddButton>
      ) : (
        <></>
      ),
    [isEditorUser, t]
  )

  const resetCompanyFilters = useCallback((): void => {
    dispatch(campaignListActions.resetCompanyCampaignFilters())
  }, [dispatch])

  const resetPartnerFilters = useCallback((): void => {
    dispatch(campaignListActions.resetPartnerCampaignFilters())
  }, [dispatch])

  const handleCompanyExport = useCallback((): void => {
    campaignListActions.exportCompanyCampaigns()
  }, [])

  const handlePartnerExport = useCallback((): void => {
    campaignListActions.exportPartnerCampaigns()
  }, [])

  const tabBarExtraContent = useMemo(() => {
    const resetFilters = (): void => {
      if (isCompanyCampaign) {
        resetCompanyFilters()
      } else {
        resetPartnerFilters()
      }
    }

    const handleExport = (): void => {
      if (isCompanyCampaign) {
        handleCompanyExport()
      } else {
        handlePartnerExport()
      }
    }
    const handleSettings = (): void => {
      // TODO Open settings
    }

    const columnOrderUtils = isCompanyCampaign ? companyColumnOrderUtils : partnerColumnOrderUtils

    return (
      <>
        <ExportButton onClick={handleExport} />
        <ResetFiltersButton onClick={resetFilters} />
        <ColumnOrderDropdown {...columnOrderUtils} />
        <SettingsButton onClick={handleSettings} />
      </>
    )
  }, [
    isCompanyCampaign,
    partnerColumnOrderUtils,
    companyColumnOrderUtils,
    resetCompanyFilters,
    resetPartnerFilters,
    handleCompanyExport,
    handlePartnerExport
  ])

  return {
    companyCampaignHeaderOptions,
    companyCampaignTableProps,
    partnerCampaignHeaderOptions,
    partnerCampaignTableProps,
    tabBarExtraContent,
    selectedTab,
    setSelectedTab
  }
}
