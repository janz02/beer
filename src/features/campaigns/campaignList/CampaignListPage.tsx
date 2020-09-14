import React, { useEffect, FC, useMemo } from 'react'
import { useDispatch } from 'hooks/react-redux-hooks'
import { history } from 'router/router'
import { useTranslation } from 'react-i18next'
import { Roles } from 'api/swagger/coupon'
import { hasPermission } from 'services/jwt-reader'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { GenericPopup } from 'components/popups/GenericPopup'
import { AddButton } from 'components/buttons/AddButton'
import { useCampaignList } from './useCampaignList'
import { CampaignListTabs } from './components/CampaignListTabs'
import { Checkbox } from 'antd'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { CouponListTabKey } from './campaignListSlice'
import { useColumnOrder } from 'components/table-columns/useColumnOrder'
import { ResetFiltersButton } from 'components/ResetFiltersButton'

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
    deleteCoupon
  } = useCampaignList()

  const columnOrders = {
    [CouponListTabKey.Waiting]: useColumnOrder(columnsConfig, ColumnStorageName.CAMPAIGN_WAITING),
    [CouponListTabKey.Accepted]: useColumnOrder(columnsConfig, ColumnStorageName.CAMPAIGN_ACCEPTED),
    [CouponListTabKey.Closed]: useColumnOrder(columnsConfig, ColumnStorageName.CAMPAIGN_CLOSED),
    [CouponListTabKey.Created]: useColumnOrder(columnsConfig, ColumnStorageName.CAMPAIGN_CREATED),
    [CouponListTabKey.All]: useColumnOrder(columnsConfig, ColumnStorageName.CAMPAIGN_ALL)
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

  /**
   * Display different tab bar actions for different tabs conditionally based on the activeTabKey
   */
  const tabBarActions = useMemo(
    () => (
      <>
        <Checkbox
          onChange={e => {
            handleIncludeArchivedChange(e.target.checked)
          }}
        >
          {t('coupon-list.show-archived')}
        </Checkbox>
        <ResetFiltersButton onClick={resetFilters} />
        <ColumnOrderDropdown {...columnOrders[activeTabKey]} />
      </>
    ),
    [t, handleIncludeArchivedChange, columnOrders, activeTabKey, resetFilters]
  )

  return (
    <>
      <ResponsiveCard
        disableAutoScale
        width="full"
        floatingTitle={t('coupon-list.campaigns')}
        forTable
        paddedBottom
        floatingOptions={cardHeaderActions}
      >
        <CampaignListTabs
          columnOrders={columnOrders}
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
    </>
  )
}
