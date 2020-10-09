import React, { useMemo } from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { CampaignCategoryTab } from './CampaignCategoryTab'
import { hasPermission } from 'services/jwt-reader'
import { SettingsTab } from '../SettingsPage'
import { pageViewRoles } from 'services/roleHelpers'
import { useCampaignCategoryList } from './categoryList/useCampaignCategoryList'
import { AppstoreAddOutlined } from '@ant-design/icons'

export const useCampaignCategoryTab = (): SettingsTab => {
  const { t } = useTranslation()
  const { tab, id } = useParams()

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.settingsEditor), [])

  const modalUtils = useGenericModalFormEditorUtils({
    dataId: tab === 'campaign-categories' ? id : undefined,
    rootRoute: '/settings',
    detailRoute: '/campaign-categories'
  })

  const categoryListUtils = useCampaignCategoryList({ onOpenEditor: modalUtils.routeToEditor })

  const headerOptions = useMemo(
    () =>
      isEditorUser ? (
        <AddButton onClick={() => modalUtils.routeToEditor()}>
          {t('campaign-category.add')}
        </AddButton>
      ) : (
        <></>
      ),
    [modalUtils, isEditorUser, t]
  )

  const tabContent = useMemo(
    () => <CampaignCategoryTab modalUtils={modalUtils} categoryListUtils={categoryListUtils} />,
    [modalUtils, categoryListUtils]
  )

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
