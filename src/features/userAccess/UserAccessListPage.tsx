import React, { FC, useEffect, useState } from 'react'
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

  const [selectedTab, setSelectedTab] = useState('nkm')
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

  const tableSelector = [
    {
      key: 'nkm',
      tab: t('user-access.nkm-users')
    },
    {
      key: 'partner',
      tab: t('user-access.partner-users')
    }
  ]

  const contentTables: { [key: string]: JSX.Element } = {
    nkm: (
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
    ),
    partner: (
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
    )
  }

  return (
    <>
      <ResponsivePage>
        <ResponsiveCard
          forTable
          floatingTitle={t('user-access.user-access')}
          tabList={tableSelector}
          onTabChange={key => {
            setSelectedTab(key)
          }}
        >
          {contentTables[selectedTab]}
        </ResponsiveCard>
      </ResponsivePage>

      <UserAccessEditor {...editorModal} handleClose={() => setEditorModal(null)} />
    </>
  )
}
