import React, { useEffect, FC, useMemo } from 'react'
import { useDispatch } from 'hooks/react-redux-hooks'
import { history } from 'router/router'
import { useTranslation } from 'react-i18next'
import { Roles } from 'api/swagger/coupon'
import { hasPermission } from 'services/jwt-reader'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { GenericPopup } from 'components/popups/GenericPopup'
import { AddButton } from 'components/buttons/AddButton'
import { useCampaignListUtils } from './useCampaignListUtils'
import { CampaignListTabs } from './components/CampaignListTabs'
import { Checkbox } from 'antd'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { CouponListTabKey } from './campaignListSlice'
import { useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { ExportButton } from 'components/buttons/ExportButton'

const couponCreateRoles = [Roles.Administrator, Roles.CampaignManager, Roles.PartnerContactEditor]

export const CampaignListPage: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const {
    loading,
    coupons,
    handleTableChange,
    columnsConfig,
    paginationConfig,
    couponToDelete,
    deletePopupVisible,
    activeTabKey,
    resetFilters,
    handleIncludeArchivedChange,
    handleTabChange,
    handleDeleteCancel,
    getCategories,
    getCoupons,
    handleExport,
    deleteCoupon
  } = useCampaignListUtils()

  const columnOrders = {
    [CouponListTabKey.Waiting]: useColumnOrderUtils(
      columnsConfig,
      ColumnStorageName.CAMPAIGN_WAITING
    ),
    [CouponListTabKey.Accepted]: useColumnOrderUtils(
      columnsConfig,
      ColumnStorageName.CAMPAIGN_ACCEPTED
    ),
    [CouponListTabKey.Closed]: useColumnOrderUtils(
      columnsConfig,
      ColumnStorageName.CAMPAIGN_CLOSED
    ),
    [CouponListTabKey.Created]: useColumnOrderUtils(
      columnsConfig,
      ColumnStorageName.CAMPAIGN_CREATED
    ),
    [CouponListTabKey.All]: useColumnOrderUtils(columnsConfig, ColumnStorageName.CAMPAIGN_ALL)
  }

  const tableProps = {
    loading,
    coupons,
    handleTableChange,
    columnsConfig,
    paginationConfig
  }

  // TODO create useCampaignNotifications for getting badge numbers

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch, getCategories])

  useEffect(() => {
    dispatch(getCoupons())
  }, [dispatch, getCoupons])

  const cardHeaderActions = useMemo(
    () => (
      <>
        {hasPermission(couponCreateRoles) && (
          <AddButton onClick={() => history.push(`/campaign`)}>{t('coupon-list.add')}</AddButton>
        )}
      </>
    ),
    [t]
  )

  const archivedCheckbox = useMemo(
    () =>
      activeTabKey === CouponListTabKey.All && (
        <Checkbox
          onChange={e => {
            handleIncludeArchivedChange(e.target.checked)
          }}
        >
          {t('coupon-list.show-archived')}
        </Checkbox>
      ),
    [activeTabKey, handleIncludeArchivedChange, t]
  )

  /**
   * Display different tab bar actions for different tabs conditionally based on the activeTabKey
   */
  const tabBarActions = useMemo(
    () => (
      <>
        {archivedCheckbox}
        <ExportButton onClick={handleExport} />
        <ResetFiltersButton onClick={resetFilters} />
        <ColumnOrderDropdown {...columnOrders[activeTabKey]} />
      </>
    ),
    [archivedCheckbox, resetFilters, columnOrders, activeTabKey, handleExport]
  )

  return (
    <div className="campaign-list">
      <ResponsiveCard
        disableAutoScale
        width="full"
        floatingTitle={t('coupon-list.campaigns')}
        forTable
        paddedBottom
        floatingOptions={cardHeaderActions}
      >
        <CampaignListTabs
          columnOrderUtils={columnOrders}
          tableProps={tableProps}
          activeTabKey={activeTabKey}
          onTabChange={handleTabChange}
          tabBarRightActions={tabBarActions}
        />
      </ResponsiveCard>

      <GenericPopup
        id={couponToDelete?.id}
        type="delete"
        visible={deletePopupVisible}
        onOkAction={couponToDelete?.id ? deleteCoupon(couponToDelete.id) : undefined}
        onCancel={() => handleDeleteCancel()}
      />
    </div>
  )
}
