import React, { useMemo } from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { hasPermission } from 'services/jwt-reader'
import { SettingsTabUtils } from '../SettingsPage'
import { pageViewRoles } from 'services/roleHelpers'
import { SegmentationCategoryTab } from './SegmentationCategoryTab'
import { PartitionOutlined } from '@ant-design/icons'
import { useSegmentationCategoryListUtils } from './categoryList/useSegmentationCategoryListUtils'

export const useSegmentationCategoryTabUtils = (): SettingsTabUtils => {
  const { t } = useTranslation()
  const { tab, id } = useParams()

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.settingsEditor), [])

  const modalUtils = useGenericModalFormEditorUtils({
    dataId: tab === 'segmentation-categories' ? id : undefined,
    rootRoute: '/settings',
    detailRoute: '/segmentation-categories'
  })

  const categoryListUtils = useSegmentationCategoryListUtils({
    onOpenEditor: modalUtils.routeToEditor
  })

  const headerOptions = useMemo(
    () =>
      isEditorUser ? (
        <AddButton onClick={() => modalUtils.routeToEditor()}>
          {t('segmentation-category.add')}
        </AddButton>
      ) : (
        <></>
      ),
    [isEditorUser, modalUtils, t]
  )

  const tabContent = useMemo(
    () => <SegmentationCategoryTab modalUtils={modalUtils} categoryListUtils={categoryListUtils} />,
    [modalUtils, categoryListUtils]
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
