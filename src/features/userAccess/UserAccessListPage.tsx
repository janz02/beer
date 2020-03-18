import React, { FC, useEffect } from 'react'
import { ResponsivePage } from 'components/responsive/ResponsivePage'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { UserAccessEditor } from './UserAccessEditor'
import { useDispatch } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { getNkmUsers, getPartnerUsers } from './userAccessListSlice'
import { useUserAccessListPage } from './useUserAccessListPage'

export const UserAccessListPage: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const {
    partnerUsersColumnsConfig,
    nkmUsersColumnsConfig,
    nkmUsersTableUtils,
    partnerUsersTableUtils,
    setEditorModal,
    editorModal,
    nkmUsers,
    nkmLoading,
    partnerUsers,
    partnerLoading
  } = useUserAccessListPage()

  useEffect(() => {
    dispatch(getNkmUsers())
    dispatch(getPartnerUsers())
  }, [dispatch])

  return (
    <>
      <ResponsivePage>
        <ResponsiveCard
          forTable
          floatingTitle={t('user-access.user-access')}
          innerTitle={t('user-access.nkm-users')}
          paddedBottom
          extraWide
        >
          <ResponsiveTable
            hasHeaderOffset
            {...{
              loading: nkmLoading,
              columns: nkmUsersColumnsConfig,
              dataSource: nkmUsers.map((u, i) => ({ ...u, key: i })),
              pagination: nkmUsersTableUtils.paginationConfig,
              onChange: nkmUsersTableUtils.handleTableChange,
              size: 'small'
            }}
          />
        </ResponsiveCard>
        <ResponsiveCard forTable innerTitle={t('user-access.partner-users')} paddedBottom extraWide>
          <ResponsiveTable
            hasHeaderOffset
            {...{
              loading: partnerLoading,
              columns: partnerUsersColumnsConfig,
              dataSource: partnerUsers.map((u, i) => ({ ...u, key: i })),
              pagination: partnerUsersTableUtils.paginationConfig,
              onChange: partnerUsersTableUtils.handleTableChange,
              size: 'small'
            }}
          />
        </ResponsiveCard>
      </ResponsivePage>

      <UserAccessEditor {...editorModal} handleClose={() => setEditorModal(null)} />
    </>
  )
}
