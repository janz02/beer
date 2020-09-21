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

export const useTestGroupCategoryTab = (): SettingsTab => {
  const { t } = useTranslation()
  const { id } = useParams()

  const modalUtils = useGenericModalFormEditorUtils({
    dataId: id,
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
    roles: pageViewRoles.categories,
    headerOptions,
    tabContent,
    resetFilters: categoryListUtils.resetFilters
  }
}
