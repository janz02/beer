import React, { useMemo } from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { ProductTab } from './ProductTab'
import { SettingsTabUtils } from '../SettingsPage'
import { pageViewRoles } from 'services/roleHelpers'
import { useProductListUtils } from './productList/useProductListUtils'
import { GoldOutlined } from '@ant-design/icons'
import { hasPermission } from 'services/jwt-reader'

export const useProductTabUtils = (): SettingsTabUtils => {
  const { t } = useTranslation()
  const { id, tab } = useParams()

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.settingsEditor), [])

  const modalUtils = useGenericModalFormEditorUtils({
    dataId: tab === 'products' ? id : undefined,
    rootRoute: '/settings',
    detailRoute: '/products'
  })

  const productListUtils = useProductListUtils({ onOpenEditor: modalUtils.routeToEditor })

  const headerOptions = useMemo(
    () =>
      isEditorUser ? (
        <AddButton onClick={() => modalUtils.routeToEditor()}>
          {t('campaign-product.add')}
        </AddButton>
      ) : (
        <></>
      ),
    [isEditorUser, modalUtils, t]
  )

  const tabContent = useMemo(
    () => <ProductTab modalUtils={modalUtils} productListUtils={productListUtils} />,
    [modalUtils, productListUtils]
  )

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
