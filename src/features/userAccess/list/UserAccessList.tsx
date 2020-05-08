import React, { FC, useEffect, useState, useMemo } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'
import { userAccessActions } from '../userAccessSlice'
import { useUserAccessList } from './useUserAccessList'

export const UserAccessList: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState('nkm')
  const {
    partnerUsersColumnsConfig,
    nkmUsersColumnsConfig,
    nkmUsersTableUtils,
    partnerUsersTableUtils,
    nkmUsers,
    nkmLoading,
    partnerUsers,
    partnerLoading
  } = useUserAccessList()

  useEffect(() => {
    dispatch(userAccessActions.getNkmUsers())
    dispatch(userAccessActions.getPartnerUsers())
  }, [dispatch])

  const tableSelector = useMemo(
    () => [
      {
        key: 'nkm',
        tab: t('user-access.nkm-users')
      },
      {
        key: 'partner',
        tab: t('user-access.partner-users')
      }
    ],
    [t]
  )

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
      <ResponsiveCard
        width="full"
        forTable
        floatingTitle={t('user-access.user-access')}
        tabList={tableSelector}
        onTabChange={key => {
          setSelectedTab(key)
        }}
      >
        {contentTables[selectedTab]}
      </ResponsiveCard>
    </>
  )
}
