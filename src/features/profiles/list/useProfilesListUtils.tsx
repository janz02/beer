import React, { useMemo, useState } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'react-redux'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { profilesActions } from '../profilesSlice'
import { useTableUtils, TableUtils, FilterMode } from 'hooks/useTableUtils'
import { useTranslation } from 'react-i18next'
import { ColumnsType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/coupon'
import { FeatureState } from 'models/featureState'
import { Profile } from 'models/profile2'

interface ProfilesListUtils {
  columnsConfig: ColumnsType<Profile>
  tableUtils: TableUtils<Profile>
  profiles: Profile[]
  profilesLoading: boolean
  selectedTab: string
  setSelectedTab: (tab: string) => void
  resetFilters: () => void
}

export const useProfilesListUtils = (): ProfilesListUtils => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState<string>('nkm')

  const { listParams, listState, profiles } = useSelector((state: RootState) => state.profiles)

  const tableUtils = useTableUtils<Profile>({
    listParamsState: listParams,
    filterKeys: ['name', 'username', 'email'],
    getDataAction: profilesActions.getProfiles
  })

  const columnsConfig: ColumnsType<Profile> = useMemo(
    () => [
      tableUtils.columnConfig({
        title: t('profiles.field.status'),
        filterMode: FilterMode.ACTIVE_INACTIVE,
        key: 'isActive',
        width: '7rem'
      }),
      tableUtils.columnConfig({
        title: t('profiles.field.name'),
        key: 'name',
        // width: '35%',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      tableUtils.columnConfig({
        title: t('profiles.field.username'),
        key: 'username',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      tableUtils.columnConfig({
        title: t('profiles.field.email'),
        key: 'email',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      tableUtils.columnConfig({
        title: t('profiles.field.groups'),
        key: 'groups',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      tableUtils.columnConfig({
        title: t('profiles.field.permissions'),
        key: 'permissions',
        sort: false,
        filterMode: FilterMode.SEARCH
      }),
      hasPermission([Roles.Administrator])
        ? tableUtils.actionColumnConfig({
            render(profile: Profile) {
              return <CrudButtons onEdit={() => ({})} />
            }
          })
        : {}
    ],
    [tableUtils, t]
  )

  const resetFilters = (): void => {
    dispatch(profilesActions.resetProfilesFilters())
  }

  return {
    columnsConfig,
    tableUtils,
    profiles,
    profilesLoading: listState === FeatureState.Loading,
    resetFilters,
    selectedTab,
    setSelectedTab
  }
}
