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
import { Profile, ProfileStatus } from 'models/profile2'
import { ProfileStatusDisplay } from './ProfileStatusDisplay'

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

  const [selectedTab, setSelectedTab] = useState<string>('all')

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
        filterMode: FilterMode.ENUM,
        key: 'status',
        width: '10rem',
        filters: [
          { value: 'approved', text: t('profiles.status.approved') },
          { value: 'declined', text: t('profiles.status.declined') },
          { value: 'waiting-for-approval', text: t('profiles.status.waiting-for-approval') }
        ],
        render(status: ProfileStatus) {
          return <ProfileStatusDisplay status={status} />
        }
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
        title: t('profiles.field.group'),
        key: 'group',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      tableUtils.columnConfig({
        title: t('profiles.field.permissions'),
        key: 'permissions',
        sort: true
      }),
      tableUtils.columnConfig({
        title: t('organization.companies.field.created-date'),
        key: 'dateOfRegistration',
        sort: true,
        renderMode: 'date time',
        filterMode: FilterMode.DATEPICKER,
        hiddenByDefault: true
      }),
      tableUtils.columnConfig({
        title: t('profiles.field.company'),
        key: 'company',
        sort: false,
        filterMode: FilterMode.SEARCH,
        hiddenByDefault: true
      }),
      tableUtils.columnConfig({
        title: t('profiles.field.job-role'),
        key: 'jobRole',
        sort: false,
        filterMode: FilterMode.SEARCH,
        hiddenByDefault: true
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
