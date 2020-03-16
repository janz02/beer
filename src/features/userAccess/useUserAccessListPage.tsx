import React, { useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'react-redux'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { getNkmUsers, getPartnerUsers, UserType } from './userAccessListSlice'
import { useTableUtils, UseTableUtilsTools } from 'hooks/useTableUtils'
import { useTranslation } from 'react-i18next'
import { UserAccess } from 'models/user'
import { UserAccessEditorProps } from './UserAccessEditor'
import { ColumnsType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/models'

interface UseUserAccessListPageUtils {
  partnerUsersColumnsConfig: ColumnsType<UserAccess>
  nkmUsersColumnsConfig: ColumnsType<UserAccess>
  nkmUsersTableUtils: UseTableUtilsTools
  partnerUsersTableUtils: UseTableUtilsTools
  editorModal: UserAccessEditorProps | null | undefined
  setEditorModal: React.Dispatch<React.SetStateAction<UserAccessEditorProps | null | undefined>>
  nkmUsers: UserAccess[]
  nkmLoading: boolean
  partnerUsers: UserAccess[]
  partnerLoading: boolean
}

export const useUserAccessListPage = (): UseUserAccessListPageUtils => {
  const { t } = useTranslation()
  const {
    nkmPagination,
    partnerPagination,
    nkmUsers,
    nkmLoading,
    partnerUsers,
    partnerLoading
  } = useSelector((state: RootState) => state.userAccessList)

  const [editorModal, setEditorModal] = useState<UserAccessEditorProps | null>()

  const nkmUsersTableUtils = useTableUtils({
    paginationState: nkmPagination,
    getDataAction: getNkmUsers
  })

  const nkmUsersColumnsConfig: ColumnsType<UserAccess> = useMemo(
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
        ...nkmUsersTableUtils.sorterConfig,
        render: (value: unknown, user: UserAccess) =>
          t(`user-access.field.status-${user.active ? 'active' : 'inactive'}`)
      },
      {
        title: t('user-access.field.role'),
        dataIndex: 'role',
        key: 'role',
        render: (value: unknown, user: UserAccess) =>
          t(`user-access.role.${user.role?.toLowerCase()}`)
      },
      hasPermission([Roles.Administrator])
        ? {
            title: '',
            key: 'actions',
            colSpan: 1,
            render(user: UserAccess) {
              return (
                <CrudButtons
                  onEdit={() =>
                    setEditorModal({ visible: true, userId: user.id, userType: UserType.NKM })
                  }
                />
              )
            }
          }
        : {}
    ],
    [nkmUsersTableUtils.sorterConfig, t]
  )

  const partnerUsersTableUtils = useTableUtils({
    paginationState: partnerPagination,
    getDataAction: getPartnerUsers
  })

  const partnerUsersColumnsConfig: ColumnsType<UserAccess> = useMemo(
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
        ...partnerUsersTableUtils.sorterConfig,
        render: (value: unknown, user: UserAccess) =>
          t(`user-access.field.status-${user.active ? 'active' : 'inactive'}`)
      },
      {
        title: t('user-access.field.partner-name'),
        dataIndex: 'partnerName',
        key: 'partnerName'
      },
      {
        title: t('user-access.field.partner-type'),
        dataIndex: 'partnerType',
        key: 'partnerType'
      },
      {
        title: t('user-access.field.role'),
        dataIndex: 'role',
        key: 'role',
        render: (value: unknown, user: UserAccess) =>
          t(`user-access.role.${user.role?.toLowerCase()}`)
      },
      hasPermission([Roles.Administrator])
        ? {
            title: t('common.actions'),
            key: 'actions',
            colSpan: 1,
            render(user: UserAccess) {
              return (
                <CrudButtons
                  onEdit={() =>
                    setEditorModal({ visible: true, userId: user.id, userType: UserType.PARTNER })
                  }
                />
              )
            }
          }
        : {}
    ],
    [partnerUsersTableUtils.sorterConfig, t]
  )

  return {
    partnerUsersColumnsConfig,
    nkmUsersColumnsConfig,
    nkmUsersTableUtils,
    partnerUsersTableUtils,
    editorModal,
    setEditorModal,
    nkmUsers,
    nkmLoading,
    partnerUsers,
    partnerLoading
  }
}