import React, { useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'react-redux'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { getNkmUsers, getPartnerUsers } from './userAccessListSlice'
import { useTableUtils, UseTableUtils, FilterMode } from 'hooks/useTableUtils'
import { useTranslation } from 'react-i18next'
import { UserAccess, UserType } from 'models/user'
import { UserAccessEditorProps } from './UserAccessEditor'
import { ColumnsType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/models'

interface UseUserAccessListPageUtils {
  partnerUsersColumnsConfig: ColumnsType<UserAccess>
  nkmUsersColumnsConfig: ColumnsType<UserAccess>
  nkmUsersTableUtils: UseTableUtils<UserAccess>
  partnerUsersTableUtils: UseTableUtils<UserAccess>
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
    nkmListParams,
    partnerListParams,
    nkmUsers,
    nkmLoading,
    partnerUsers,
    partnerLoading
  } = useSelector((state: RootState) => state.userAccessList)

  const [editorModal, setEditorModal] = useState<UserAccessEditorProps | null>()

  const nkmUsersTableUtils = useTableUtils<UserAccess>({
    listParamsState: nkmListParams,
    filterKeys: ['name', 'email', 'role'],
    getDataAction: getNkmUsers
  })

  // TODO: Filter
  // const nkmRoleOptions = useUserAccessRoleGenerator(UserType.NKM)

  const nkmUsersColumnsConfig: ColumnsType<UserAccess> = useMemo(
    () => [
      nkmUsersTableUtils.columnConfig({
        title: t('user-access.field.name'),
        key: 'name',
        width: '35%',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      nkmUsersTableUtils.columnConfig({
        title: t('user-access.field.email'),
        key: 'email',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      nkmUsersTableUtils.columnConfig({
        title: t('user-access.field.status'),
        key: 'active',
        width: '6rem',
        render: (value: unknown, user: UserAccess) =>
          t(`user-access.field.status-${user.active ? 'active' : 'inactive'}`)
      }),
      nkmUsersTableUtils.columnConfig({
        title: t('user-access.field.role'),
        key: 'role',
        // TODO: no BE support yet
        // sort: true,
        // filterMode: FilterMode.FILTER,
        // filters: nkmRoleOptions,
        render: (value: unknown, user: UserAccess) => t(`user.role.${user.role?.toLowerCase()}`)
      }),
      hasPermission([Roles.Administrator])
        ? nkmUsersTableUtils.actionColumnConfig({
            render(user: UserAccess) {
              return (
                <CrudButtons
                  onEdit={() =>
                    setEditorModal({ visible: true, userId: user.id, userType: UserType.NKM })
                  }
                />
              )
            }
          })
        : {}
    ],
    [nkmUsersTableUtils, t]
  )

  const partnerUsersTableUtils = useTableUtils<UserAccess>({
    listParamsState: partnerListParams,
    filterKeys: ['name', 'email'],
    getDataAction: getPartnerUsers
  })

  // TODO: Filter
  // const partnerRoleOptions = useUserAccessRoleGenerator(UserType.PARTNER)

  const partnerUsersColumnsConfig: ColumnsType<UserAccess> = useMemo(
    () => [
      partnerUsersTableUtils.columnConfig({
        title: t('user-access.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      partnerUsersTableUtils.columnConfig({
        title: t('user-access.field.email'),
        key: 'email',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      partnerUsersTableUtils.columnConfig({
        title: t('user-access.field.phone'),
        width: '8rem',
        key: 'phone',
        filterMode: FilterMode.SEARCH
      }),
      partnerUsersTableUtils.columnConfig({
        title: t('user-access.field.partner-name'),
        width: '10rem',
        key: 'partnerName',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      partnerUsersTableUtils.columnConfig({
        title: t('user-access.field.partner-type'),
        key: 'majorPartner',
        width: '5rem',
        render: (value: unknown, user: UserAccess) =>
          t(`user-access.field.partnerType.${user.active ? 'major' : 'normal'}`)
      }),
      partnerUsersTableUtils.columnConfig({
        title: t('user-access.field.status'),
        key: 'active',
        width: '5rem',
        render: (value: unknown, user: UserAccess) =>
          t(`user-access.field.status-${user.active ? 'active' : 'inactive'}`)
      }),
      partnerUsersTableUtils.columnConfig({
        title: t('user-access.field.role'),
        key: 'role',
        // TODO: no BE support yet
        // sort: true,
        // filterMode: FilterMode.FILTER,
        // filters: partnerRoleOptions,
        width: '15rem',
        render: (value: unknown, user: UserAccess) => t(`user.role.${user.role?.toLowerCase()}`)
      }),
      hasPermission([Roles.Administrator])
        ? partnerUsersTableUtils.actionColumnConfig({
            render(user: UserAccess) {
              return (
                <CrudButtons
                  onEdit={() =>
                    setEditorModal({ visible: true, userId: user.id, userType: UserType.PARTNER })
                  }
                />
              )
            }
          })
        : {}
    ],
    [partnerUsersTableUtils, t]
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
