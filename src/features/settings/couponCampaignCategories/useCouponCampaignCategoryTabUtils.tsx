import React, { useMemo } from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { CouponCampaignCategoryTab } from './CouponCampaignCategoryTab'
import { hasPermission } from 'services/jwt-reader'
import { SettingsTabUtils } from '../SettingsPage'
import { pageViewRoles } from 'services/roleHelpers'
import { useCouponCampaignCategoryListUtils } from './categoryList/useCouponCampaignCategoryListUtils'
import { AppstoreAddOutlined } from '@ant-design/icons'

export const useCouponCampaignCategoryTabUtils = (): SettingsTabUtils => {
  const { t } = useTranslation()
  const { tab, id } = useParams()

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.settingsEditor), [])

  const modalUtils = useGenericModalFormEditorUtils({
    dataId: tab === 'coupon-campaign-categories' ? id : undefined,
    rootRoute: '/settings',
    detailRoute: '/coupon-campaign-categories'
  })

  const categoryListUtils = useCouponCampaignCategoryListUtils({
    onOpenEditor: modalUtils.routeToEditor
  })

  const headerOptions = useMemo(
    () =>
      isEditorUser ? (
        <AddButton onClick={() => modalUtils.routeToEditor()}>
          {t('coupon-campaign-category.add')}
        </AddButton>
      ) : (
        <></>
      ),
    [modalUtils, isEditorUser, t]
  )

  const tabContent = useMemo(
    () => (
      <CouponCampaignCategoryTab modalUtils={modalUtils} categoryListUtils={categoryListUtils} />
    ),
    [modalUtils, categoryListUtils]
  )

  return {
    key: 'coupon-campaign-categories',
    title: t('settings.coupon-campaign-categories'),
    roles: pageViewRoles.couponCampaignCategories,
    headerOptions,
    tabContent,
    icon: <AppstoreAddOutlined />,
    notificationCount: 0,
    resetFilters: categoryListUtils.resetFilters
  }
}
