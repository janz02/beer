import React, { useEffect, FC } from 'react'
import { Checkbox } from 'antd'
import { useDispatch } from 'hooks/react-redux-hooks'
import { history } from 'router/router'
import { useTranslation } from 'react-i18next'
import { Roles } from 'api/swagger/models'
import { hasPermission } from 'services/jwt-reader'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { GenericPopup } from 'components/popups/GenericPopup'
import { AddButton } from 'components/buttons/AddButton'
import { useCampaignList } from './useCampaignList'
import { CampaignListTable } from './components/CampaignListTable'
import { CouponListTabKey } from './campaignListSlice'

const couponCreateRoles = [Roles.Administrator, Roles.CampaignManager, Roles.PartnerContactEditor]

export const CampaignListPage: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const {
    activeTabKey,
    couponToDelete,
    deletePopupVisible,
    handleIncludeArchivedChange,
    handleTabChange,
    handleDeleteCancel,
    getCategories,
    getCoupons,
    deleteCoupon
  } = useCampaignList()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch, getCategories])

  useEffect(() => {
    dispatch(getCoupons())
  }, [dispatch, getCoupons])

  return (
    <>
      <ResponsiveCard
        disableAutoScale
        forTable
        floatingTitle={t('coupon-list.campaigns')}
        floatingOptions={
          <>
            <Checkbox
              onChange={e => {
                handleIncludeArchivedChange(e.target.checked)
              }}
            >
              {t('coupon-list.show-archived')}
            </Checkbox>
            {hasPermission(couponCreateRoles) && (
              <AddButton onClick={() => history.push(`/campaign`)}>
                {t('coupon-list.add')}
              </AddButton>
            )}
          </>
        }
        paddedBottom
        width="full"
        activeTabKey={activeTabKey}
        tabList={[
          {
            key: CouponListTabKey.All,
            tab: t('coupon-list.all-tab')
          },
          {
            key: CouponListTabKey.Waiting,
            tab: t('coupon-list.pending-tab')
          }
        ]}
        onTabChange={key => handleTabChange(key as CouponListTabKey)}
      >
        <CampaignListTable />
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
