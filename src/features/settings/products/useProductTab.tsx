import React from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { ProductTab } from './ProductTab'
import { hasPermission } from 'services/jwt-reader'
import { SettingsTab } from '../SettingsPage'
import { Roles } from 'api/swagger/coupon'
import { pageViewRoles } from 'services/roleHelpers'
import { useProductList } from './productList/useProductList'
import { history } from '../../../router/router'
import { GoldOutlined } from '@ant-design/icons'

export const useProductTab = (): SettingsTab => {
  const { t } = useTranslation()
  const { id } = useParams()

  const modalUtils = useGenericModalFormEditorUtils({
    dataId: id,
    rootRoute: '/settings',
    detailRoute: '/products'
  })

  const productListUtils = useProductList({ onOpenEditor: modalUtils.routeToEditor })

  let headerOptions: JSX.Element | undefined
  if (hasPermission([Roles.Administrator])) {
    headerOptions = (
      <AddButton onClick={() => history.push(`/settings/products/new`)}>
        {t('campaign-product.add')}
      </AddButton>
    )
  }

  const tabContent = <ProductTab productListUtils={productListUtils} />

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
