import React from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { ProductTab } from './ProductTab'
import { SettingsTab } from '../SettingsPage'
import { pageViewRoles } from 'services/roleHelpers'
import { useProductList } from './productList/useProductList'
import { GoldOutlined } from '@ant-design/icons'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/coupon'

export const useProductTab = (): SettingsTab => {
  const { t } = useTranslation()
  const { id, tab } = useParams()

  const modalUtils = useGenericModalFormEditorUtils({
    dataId: tab === 'products' ? id : undefined,
    rootRoute: '/settings',
    detailRoute: '/products'
  })

  const productListUtils = useProductList({ onOpenEditor: modalUtils.routeToEditor })

  let headerOptions: JSX.Element | undefined
  if (hasPermission([Roles.Administrator])) {
    headerOptions = (
      <AddButton onClick={() => modalUtils.routeToEditor()}>{t('campaign-product.add')}</AddButton>
    )
  }

  const tabContent = <ProductTab modalUtils={modalUtils} productListUtils={productListUtils} />

  return {
    key: 'campaign-products',
    title: t('settings.campaign-products'),
    roles: pageViewRoles.products,
    headerOptions,
    tabContent,
    icon: <GoldOutlined />,
    notificationCount: 0,
    resetFilters: productListUtils.resetFilters
  }
}
