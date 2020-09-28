import React from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { hasPermission } from 'services/jwt-reader'
import { SettingsTab } from '../SettingsPage'
import { Roles } from 'api/swagger/coupon'
import { pageViewRoles } from 'services/roleHelpers'
import { SegmentationCategoryTab } from './SegmentationCategoryTab'
import { PartitionOutlined } from '@ant-design/icons'
import { useSegmentationCategoryList } from './categoryList/useSegmentationCategoryList'

export const useSegmentationCategoryTab = (): SettingsTab => {
  const { t } = useTranslation()
  const { tab, id } = useParams()

  const modalUtils = useGenericModalFormEditorUtils({
    dataId: tab === 'segmentation-categories' ? id : undefined,
    rootRoute: '/settings',
    detailRoute: '/segmentation-categories'
  })

  const categoryListUtils = useSegmentationCategoryList({ onOpenEditor: modalUtils.routeToEditor })

  let headerOptions: JSX.Element | undefined
  if (hasPermission([Roles.Administrator])) {
    headerOptions = (
      <AddButton onClick={() => modalUtils.routeToEditor()}>
        {t('segmentation-category.add')}
      </AddButton>
    )
  }

  const tabContent = (
    <SegmentationCategoryTab modalUtils={modalUtils} categoryListUtils={categoryListUtils} />
  )

  return {
    key: 'segmentation-categories',
    title: t('settings.segmentation-categories'),
    roles: pageViewRoles.categories,
    headerOptions,
    tabContent,
    icon: <PartitionOutlined />,
    notificationCount: 0,
    resetFilters: categoryListUtils.resetFilters
  }
}
