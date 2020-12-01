import React, { useCallback, useMemo, useState } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'react-redux'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { userAccessActions, UserAccessTab } from '../userAccessSlice'
import { useTableUtils, TableUtils, FilterMode, ColumnConfigParams } from 'hooks/useTableUtils'
import { useTranslation } from 'react-i18next'
import { UserAccess, UserType } from 'models/user'
import { ColumnsType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/coupon'
import { useRoleGenerator } from 'hooks/useRoleGenerator'
import { FeatureState } from 'models/featureState'

interface UserAccessListUtils {
  partnerUsersColumnsConfig: ColumnsType<UserAccess>
  nkmUsersColumnsConfig: ColumnsType<UserAccess>
  nkmUsersTableUtils: TableUtils<UserAccess>
  partnerUsersTableUtils: TableUtils<UserAccess>
  nkmUsers: UserAccess[]
  nkmLoading: boolean
  partnerUsers: UserAccess[]
  partnerLoading: boolean
  selectedTab: UserAccessTab
  setSelectedTab: (tab: UserAccessTab) => void
  resetNkmFilters: () => void
  resetPartnerFilters: () => void
  handleExport: () => void
}

export const useUserAccessListUtils = (): UserAccessListUtils => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState<UserAccessTab>('nkm')

  const {
    nkmListParams,
    partnerListParams,
    nkmUsers,
    nkmListState,
    partnerUsers,
    partnerListState
  } = useSelector((state: RootState) => state.userAccess)

  const nkmRoleOptions = useRoleGenerator(UserType.NKM)

  const nkmUsersColumnParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('user-access.field.name'),
        key: 'name',
        width: '35%',
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('user-access.field.email'),
        key: 'email',
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('user-access.field.status'),
        filterMode: FilterMode.ACTIVE_INACTIVE,
        key: 'isActive',
        width: '7rem'
      },
      {
        title: t('user-access.field.role'),
        key: 'role',
        sort: false,
        filterMode: FilterMode.FILTER,
        filters: nkmRoleOptions,
        render: (value: unknown, user: UserAccess) =>
          user.role ? t(`user.role.${user.role?.toLowerCase()}`) : ''
      }
    ],
    [nkmRoleOptions, t]
  )

  const nkmUsersActionColumnParams = useMemo<Partial<ColumnConfigParams> | undefined>(
    () =>
      hasPermission([Roles.Administrator])
        ? {
            render(user: UserAccess) {
              return (
                <CrudButtons
                  onEdit={() =>
                    dispatch(userAccessActions.inspectUserAccess(UserType.NKM, user.id!))
                  }
                />
              )
            }
          }
        : undefined,
    [dispatch]
  )

  const nkmUsersTableUtils = useTableUtils<UserAccess>({
    listParamsState: nkmListParams,
    getDataAction: userAccessActions.getNkmUsers,
    columnParams: nkmUsersColumnParams,
    actionColumnParams: nkmUsersActionColumnParams
  })

  const partnerRoleOptions = useRoleGenerator(UserType.PARTNER)

  const partnerUsersColumnsParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('user-access.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('user-access.field.email'),
        key: 'email',
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('user-access.field.phone'),
        width: '8rem',
        key: 'phone',
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('user-access.field.partner-name'),
        width: '10rem',
        key: 'partnerName',
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('user-access.field.status'),
        key: 'isActive',
        width: '7rem',
        filterMode: FilterMode.ACTIVE_INACTIVE
      },
      {
        title: t('user-access.field.partner-contact-type'),
        key: 'role',
        filterMode: FilterMode.FILTER,
        sort: false,
        filters: partnerRoleOptions,
        width: '12rem',
        render: role => (role ? t(`user.role-short.${role?.toLowerCase()}`) : '')
      }
    ],
    [partnerRoleOptions, t]
  )

  const partnerUsersActionColumnsParams = useMemo<Partial<ColumnConfigParams> | undefined>(
    () =>
      hasPermission([Roles.Administrator])
        ? {
            render(user: UserAccess) {
              return (
                <CrudButtons
                  onEdit={() =>
                    dispatch(userAccessActions.inspectUserAccess(UserType.PARTNER, user.id!))
                  }
                />
              )
            }
          }
        : undefined,
    [dispatch]
  )

  const partnerUsersTableUtils = useTableUtils<UserAccess>({
    listParamsState: partnerListParams,
    getDataAction: userAccessActions.getPartnerUsers,
    columnParams: partnerUsersColumnsParams,
    actionColumnParams: partnerUsersActionColumnsParams
  })

  const resetNkmFilters = (): void => {
    dispatch(userAccessActions.resetNkmUsersFilters())
  }

  const resetPartnerFilters = (): void => {
    dispatch(userAccessActions.resetPartnerUsersFilters())
  }

  const handleExport = useCallback((): void => {
    dispatch(userAccessActions.exportPartnerContacts(selectedTab))
  }, [dispatch, selectedTab])

  return {
    partnerUsersColumnsConfig: partnerUsersTableUtils.columnsConfig,
    nkmUsersColumnsConfig: nkmUsersTableUtils.columnsConfig,
    nkmUsersTableUtils,
    partnerUsersTableUtils,
    nkmUsers,
    nkmLoading: nkmListState === FeatureState.Loading,
    partnerUsers,
    partnerLoading: partnerListState === FeatureState.Loading,
    resetNkmFilters,
    resetPartnerFilters,
    selectedTab,
    setSelectedTab,
    handleExport
  }
}
