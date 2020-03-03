import React, { useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'react-redux'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { getNkmUsers, getPartnerUsers } from './userAccessListSlice'
import { useTableUtils } from 'hooks/useTableUtils'
import { useTranslation } from 'react-i18next'
import { UserAccess } from 'models/user'
import { UserAccessEditorProps } from './UserAccessEditor'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useUserListPageLogic = () => {
  const { t } = useTranslation()
  const { nkmPagination } = useSelector((state: RootState) => state.userAccessList)
  const { partnerPagination } = useSelector((state: RootState) => state.userAccessList)

  const [editorModal, setEditorModal] = useState<UserAccessEditorProps | null>()

  const nkmUsersTableUtils = useTableUtils({
    paginationState: nkmPagination,
    getDataAction: getNkmUsers
  })

  const nkmUsersColumnsConfig = useMemo(
    () => [
      {
        title: t('user-access.field.name'),
        dataIndex: 'name',
        key: 'name',
        ...nkmUsersTableUtils.sorterConfig
      },
      {
        title: t('user-access.field.email'),
        dataIndex: 'email',
        key: 'email',
        ...nkmUsersTableUtils.sorterConfig
      },
      {
        title: t('user-access.field.status'),
        dataIndex: 'active',
        key: 'active',
        ...nkmUsersTableUtils.sorterConfig
      },
      {
        title: t('user-access.field.role'),
        dataIndex: 'role',
        key: 'role',
        ...nkmUsersTableUtils.sorterConfig
      },
      {
        title: t('common.actions'),
        key: 'actions',
        colSpan: 1,
        render(user: UserAccess) {
          return <CrudButtons onEdit={() => setEditorModal({ visible: true, userId: user.id })} />
        }
      }
    ],
    [nkmUsersTableUtils.sorterConfig, t]
  )

  const partnerUsersTableUtils = useTableUtils({
    paginationState: partnerPagination,
    getDataAction: getPartnerUsers
  })

  const partnerUsersColumnsConfig = useMemo(
    () => [
      {
        title: t('user-access.field.name'),
        dataIndex: 'name',
        key: 'name',
        ...partnerUsersTableUtils.sorterConfig
      },
      {
        title: t('user-access.field.email'),
        dataIndex: 'email',
        key: 'email',
        ...partnerUsersTableUtils.sorterConfig
      },
      {
        title: t('user-access.field.phone'),
        dataIndex: 'phone',
        key: 'phone',
        ...partnerUsersTableUtils.sorterConfig
      },
      {
        title: t('user-access.field.status'),
        dataIndex: 'active',
        key: 'active',
        ...partnerUsersTableUtils.sorterConfig
      },
      {
        title: t('user-access.field.partner-name'),
        dataIndex: 'partnerName',
        key: 'partnerName',
        ...partnerUsersTableUtils.sorterConfig
      },
      {
        title: t('user-access.field.partner-type'),
        dataIndex: 'partnerType',
        key: 'partnerType',
        ...partnerUsersTableUtils.sorterConfig
      },
      {
        title: t('user-access.field.role'),
        dataIndex: 'role',
        key: 'role',
        ...partnerUsersTableUtils.sorterConfig
      },
      {
        title: t('common.actions'),
        key: 'actions',
        colSpan: 1,
        render(user: UserAccess) {
          return <CrudButtons onEdit={() => setEditorModal({ visible: true, userId: user.id })} />
        }
      }
    ],
    [partnerUsersTableUtils.sorterConfig, t]
  )

  return {
    partnerUsersColumnsConfig,
    nkmUsersColumnsConfig,
    nkmUsersTableUtils,
    partnerUsersTableUtils,
    editorModal,
    setEditorModal
  }
}
