import React, { useEffect } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useTranslation } from 'react-i18next'
import { getPermissions } from './permissionListSlice'
import { usePermissionListPage } from './usePermissionListPage'
import { useDispatch } from 'react-redux'

export const PermissionListPage: React.FC = () => {
  const { t } = useTranslation()
  const { headerOptions, tableProps } = usePermissionListPage()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPermissions())
  }, [dispatch])

  return (
    <>
      <ResponsiveCard
        floatingTitle={t('permission.list.title')}
        floatingOptions={headerOptions}
        forTable
      >
        <ResponsiveTable {...tableProps} />
      </ResponsiveCard>
    </>
  )
}
