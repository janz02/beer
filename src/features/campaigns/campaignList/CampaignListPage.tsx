import React, { useEffect, FC } from 'react'
import './CampaignListPage.scss'
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

const couponCreateRoles = [Roles.Administrator, Roles.CampaignManager, Roles.PartnerContactEditor]

export const CampaignListPage: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const {
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
        tabList={[
          {
            key: 'all',
            tab: t('coupon-list.all-tab')
          },
          {
            key: 'waiting',
            tab: t('coupon-list.pending-tab')
          }
        ]}
        onTabChange={handleTabChange}
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
