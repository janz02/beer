import React, { FC, useEffect } from 'react'
import { ResponsivePage } from 'components/responsive/ResponsivePage'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { UserAccessEditor } from './UserAccessEditor'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { RootState } from 'app/rootReducer'
import { getNkmUsers, getPartnerUsers } from './userAccessListSlice'
import { useUserListPage } from './useAccessUserListPage'

export const UserAccessListPage: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { nkmUsers, nkmLoading, partnerUsers, partnerLoading } = useSelector(
    (state: RootState) => state.userAccessList
  )

  const {
    partnerUsersColumnsConfig,
    nkmUsersColumnsConfig,
    nkmUsersTableUtils,
    partnerUsersTableUtils,
    setEditorModal,
    editorModal
  } = useUserListPage()

  useEffect(() => {
    dispatch(getNkmUsers())
    dispatch(getPartnerUsers())
  }, [dispatch])

  return (
    <>
      <ResponsivePage>
        <ResponsiveCard
          style={{ height: '70vh' }}
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
              onChange: nkmUsersTableUtils.handleTableChange
            }}
          />
        </ResponsiveCard>
        <ResponsiveCard
          style={{ height: '70vh' }}
          forTable
          innerTitle={t('user-access.partner-users')}
          paddedBottom
          extraWide
        >
          <ResponsiveTable
            hasHeaderOffset
            {...{
              loading: partnerLoading,
              columns: partnerUsersColumnsConfig,
              dataSource: partnerUsers.map((u, i) => ({ ...u, key: i })),
              pagination: partnerUsersTableUtils.paginationConfig,
              onChange: partnerUsersTableUtils.handleTableChange
            }}
          />
        </ResponsiveCard>
      </ResponsivePage>

      <UserAccessEditor {...editorModal} handleClose={() => setEditorModal(null)} />
    </>
  )
}
