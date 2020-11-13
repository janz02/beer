import React, { useMemo, useState } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'react-redux'
import { profilesActions } from '../profilesSlice'
import { useTableUtils, TableUtils, FilterMode } from 'hooks/useTableUtils'
import { useTranslation } from 'react-i18next'
import { ColumnsType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/coupon'
import { FeatureState } from 'models/featureState'
import { ProfileListItem, ProfileStatus } from 'models/profileListItem'
import { ProfileStatusDisplay } from './ProfileStatusDisplay'
import { ActionButtons } from 'components/buttons/ActionButtons'
import { ActionButton } from 'components/buttons/ActionButton'
import { CheckCircleOutlined, CloseCircleOutlined, FormOutlined } from '@ant-design/icons'

interface ProfilesListUtils {
  columnsConfig: ColumnsType<ProfileListItem>
  tableUtils: TableUtils<ProfileListItem>
  profiles: ProfileListItem[]
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

  const tableUtils = useTableUtils<ProfileListItem>({
    listParamsState: listParams,
    filterKeys: ['name', 'username', 'email'],
    getDataAction: profilesActions.getProfiles
  })

  const columnsConfig: ColumnsType<ProfileListItem> = useMemo(
    () => [
      tableUtils.columnConfig({
        title: t('profiles.field.status'),
        filterMode: FilterMode.ENUM,
        key: 'status',
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
            width: 'auto',
            render(profile: ProfileListItem) {
              return (
                <ActionButtons>
                  {profile.status === 'waiting-for-approval' && (
                    <>
                      <ActionButton
                        icon={<CheckCircleOutlined />}
                        tooltip={t('profiles.action-buttons.approve')}
                        onClick={() => {}}
                        name="approve"
                      />
                      <ActionButton
                        icon={<CloseCircleOutlined />}
                        tooltip={t('profiles.action-buttons.decline')}
                        onClick={() => {}}
                        name="decline"
                      />
                    </>
                  )}
                  <ActionButton
                    icon={<FormOutlined />}
                    tooltip={t('common.edit')}
                    onClick={() => {}}
                    name="crudEdit"
                  />
                </ActionButtons>
              )
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
