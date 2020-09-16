import React from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { CategoryTab } from './CategoryTab'
import { hasPermission } from 'services/jwt-reader'
import { SettingsTab } from '../SettingsPage'
import { Roles } from 'api/swagger/coupon'
import { pageViewRoles } from 'services/roleHelpers'
import { useCategoryList } from './categoryList/useCategoryList'
import { AppstoreAddOutlined } from '@ant-design/icons'

export const useCategoryTab = (): SettingsTab => {
  const { t } = useTranslation()
  const { id } = useParams()

  const modalUtils = useGenericModalFormEditorUtils({
    dataId: id,
    rootRoute: '/settings',
    detailRoute: '/categories'
  })

  const categoryListUtils = useCategoryList({ onOpenEditor: modalUtils.routeToEditor })

  let headerOptions: JSX.Element | undefined
  if (hasPermission([Roles.Administrator])) {
    headerOptions = (
      <AddButton onClick={() => modalUtils.routeToEditor()}>{t('campaign-category.add')}</AddButton>
    )
  }

  const tabContent = <CategoryTab modalUtils={modalUtils} categoryListUtils={categoryListUtils} />

  return {
    key: 'campaign-categories',
    title: t('settings.campaign-categories'),
    roles: pageViewRoles.categories,
    headerOptions,
    tabContent,
    icon: <AppstoreAddOutlined />,
    notificationCount: 0,
    resetFilters: categoryListUtils.resetFilters
  }
}
