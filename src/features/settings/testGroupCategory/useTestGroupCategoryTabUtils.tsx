import React from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { hasPermission } from 'services/jwt-reader'
import { SettingsTabUtils } from '../SettingsPage'
import { Roles } from 'api/swagger/coupon'
import { pageViewRoles } from 'services/roleHelpers'
import { useTestGroupCategoryListUtils } from './testGroupCategoryList/useTestGroupCategoryListUtils'
import { TestGroupCategoryTab } from './TestGroupCategoryTab'
import { GroupOutlined } from '@ant-design/icons'

export const useTestGroupCategoryTabUtils = (): SettingsTabUtils => {
  const { t } = useTranslation()
  const { tab, id } = useParams()

  const modalUtils = useGenericModalFormEditorUtils({
    dataId: tab === 'test-group-categories' ? id : undefined,
    rootRoute: '/settings',
    detailRoute: '/test-group-categories'
  })

  const categoryListUtils = useTestGroupCategoryListUtils({
    onOpenEditor: modalUtils.routeToEditor
  })

  let headerOptions: JSX.Element | undefined
  if (hasPermission([Roles.Administrator])) {
    headerOptions = (
      <AddButton onClick={() => modalUtils.routeToEditor()}>
        {t('test-group-category.add')}
      </AddButton>
    )
  }

  const tabContent = (
    <TestGroupCategoryTab modalUtils={modalUtils} categoryListUtils={categoryListUtils} />
  )

  return {
    key: 'test-group-categories',
    title: t('settings.test-group-categories'),
    roles: pageViewRoles.settings,
    headerOptions,
    tabContent,
    icon: <GroupOutlined />,
    notificationCount: 0,
    resetFilters: categoryListUtils.resetFilters
  }
}
