import React from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { hasPermission } from 'services/jwt-reader'
import { SettingsTabUtils } from '../SettingsPage'
import { Roles } from 'api/swagger/coupon'
import { pageViewRoles } from 'services/roleHelpers'
import { SegmentationCategoryTab } from './SegmentationCategoryTab'
import { PartitionOutlined } from '@ant-design/icons'
import { useSegmentationCategoryListUtils } from './categoryList/useSegmentationCategoryListUtils'

export const useSegmentationCategoryTabUtils = (): SettingsTabUtils => {
  const { t } = useTranslation()
  const { tab, id } = useParams()

  const modalUtils = useGenericModalFormEditorUtils({
    dataId: tab === 'segmentation-categories' ? id : undefined,
    rootRoute: '/settings',
    detailRoute: '/segmentation-categories'
  })

  const categoryListUtils = useSegmentationCategoryListUtils({
    onOpenEditor: modalUtils.routeToEditor
  })

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
