import React, { useMemo } from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useTranslation } from 'react-i18next'
import { SettingsTabUtils } from '../../SettingsPage'
import { pageViewRoles } from 'services/roleHelpers'
import { OneToOneOutlined } from '@ant-design/icons'
import { SystemParamsTab } from './SystemParamsTab'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { useSystemParamsListUtils } from '../lister/useSystemParamsListUtils'

export const useSystemParamsTabUtils = (): SettingsTabUtils => {
  const { t } = useTranslation()
  const { tab, id } = useParams<{ tab: string; id: string }>()

  const editorUtils = useGenericModalFormEditorUtils({
    dataId: tab === 'system-params' ? id : undefined,
    rootRoute: '/settings',
    detailRoute: '/system-params',
    disableCreate: true
  })

  const listUtils = useSystemParamsListUtils({
    onOpenEditor: editorUtils.routeToEditor
  })

  const tabContent = useMemo(
    () => <SystemParamsTab listUtils={listUtils} editorUtils={editorUtils} />,
    [listUtils, editorUtils]
  )

  return {
    key: 'system-params',
    title: t('settings.system-params'),
    roles: pageViewRoles.settings,
    tabContent,
    icon: <OneToOneOutlined />,
    notificationCount: 0,
    resetFilters: listUtils.resetFilters
  }
}
