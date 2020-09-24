import React from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { hasPermission } from 'services/jwt-reader'
import { SettingsTab } from '../SettingsPage'
import { Roles } from 'api/swagger/coupon'
import { pageViewRoles } from 'services/roleHelpers'
import { useTestGroupCategoryList } from './testGroupCategoryList/useTestGroupCategoryList'
import { TestGroupCategoryTab } from './TestGroupCategoryTab'
import { GroupOutlined } from '@ant-design/icons'

export const useTestGroupCategoryTab = (): SettingsTab => {
  const { t } = useTranslation()
  const { tab, id } = useParams()

  const modalUtils = useGenericModalFormEditorUtils({
    dataId: tab === 'test-group-categories' ? id : undefined,
    rootRoute: '/settings',
    detailRoute: '/test-group-categories'
  })

  const categoryListUtils = useTestGroupCategoryList({ onOpenEditor: modalUtils.routeToEditor })

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
