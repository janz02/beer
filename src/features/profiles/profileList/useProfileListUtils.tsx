import React, { useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from '../../../hooks/react-redux-hooks'
import { ProfileListTab, profileListActions } from './profileListSlice'
import { useTableUtils, TableUtils, FilterMode } from 'hooks/useTableUtils'
import { useTranslation } from 'react-i18next'
import { ColumnsType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { FeatureState } from 'models/featureState'
import { Profile } from 'models/profile'
import { ProfileStatusDisplay } from './ProfileStatusDisplay'
import { ActionButtons } from 'components/buttons/ActionButtons'
import { ActionButton } from 'components/buttons/ActionButton'
import { CheckCircleOutlined, CloseCircleOutlined, FormOutlined } from '@ant-design/icons'
import { pageViewRoles } from 'services/roleHelpers'
import { ProfileStatus } from 'api/swagger/admin'
import { history } from 'router/router'

interface ProfileListUtils {
  columnsConfig: ColumnsType<Profile>
  tableUtils: TableUtils<Profile>
  profiles: Profile[]
  profilesLoading: boolean
  selectedTab: string
  setSelectedTab: (tab: ProfileListTab) => void
  resetFilters: () => void
}

export const useProfileListUtils = (): ProfileListUtils => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { listParams, listState, profiles, selectedTab } = useSelector(
    (state: RootState) => state.profileList
  )

  const setSelectedTab = (tab: ProfileListTab): void => {
    dispatch(profileListActions.changeSelectedTab(tab))
  }

  const tableUtils = useTableUtils<Profile>({
    listParamsState: listParams,
    filterKeys: [
      'status',
      'name',
      'userName',
      'email',
      'createdDate',
      'groupCount',
      'permissionCount',
      'companyName',
      'jobRoleName'
    ],
    getDataAction: profileListActions.getProfiles
  })

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.profileEditor), [])

  const columnsConfig: ColumnsType<Profile> = useMemo(
    () => [
      tableUtils.columnConfig({
        title: t('profiles.field.status'),
        filterMode: FilterMode.ENUM,
        key: 'status',
        filters:
          selectedTab === 'all'
            ? [
                { value: ProfileStatus.Active, text: t('profiles.status.active') },
                { value: ProfileStatus.InActive, text: t('profiles.status.inactive') },
                { value: ProfileStatus.Declined, text: t('profiles.status.declined') },
                {
                  value: ProfileStatus.WaitingForApproval,
                  text: t('profiles.status.waiting-for-approval')
                }
              ]
            : undefined,
        cannotBeHidden: true,
        render(status: ProfileStatus) {
          return <ProfileStatusDisplay status={status} />
        }
      }),
      tableUtils.columnConfig({
        title: t('profiles.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH,
        cannotBeHidden: true
      }),
      tableUtils.columnConfig({
        title: t('profiles.field.username'),
        key: 'userName',
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
        key: 'groupCount',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      tableUtils.columnConfig({
        title: t('profiles.field.permissions'),
        key: 'permissionCount',
        sort: true
      }),
      tableUtils.columnConfig({
        title: t('organization.companies.field.created-date'),
        key: 'createdDate',
        sort: true,
        renderMode: 'date time',
        filterMode: FilterMode.DATEPICKER,
        hiddenByDefault: true
      }),
      tableUtils.columnConfig({
        title: t('profiles.field.company'),
        key: 'companyName',
        sort: false,
        filterMode: FilterMode.SEARCH,
        hiddenByDefault: true
      }),
      tableUtils.columnConfig({
        title: t('profiles.field.job-role'),
        key: 'jobRoleName',
        sort: false,
        filterMode: FilterMode.SEARCH,
        hiddenByDefault: true
      }),
      isEditorUser
        ? tableUtils.actionColumnConfig({
            width: 'auto',
            render(profile: Profile) {
              return (
                <ActionButtons>
                  {profile.status === ProfileStatus.WaitingForApproval && (
                    <>
                      <ActionButton
                        icon={<CheckCircleOutlined />}
                        tooltip={t('profiles.action-buttons.approve')}
                        onClick={() => {
                          dispatch(
                            profileListActions.setProfileStatus(profile.id, ProfileStatus.Active)
                          )
                        }}
                        name="approve"
                      />
                      <ActionButton
                        icon={<CloseCircleOutlined />}
                        tooltip={t('profiles.action-buttons.decline')}
                        onClick={() => {
                          dispatch(
                            profileListActions.setProfileStatus(profile.id, ProfileStatus.Declined)
                          )
                        }}
                        name="decline"
                      />
                    </>
                  )}
                  <ActionButton
                    icon={<FormOutlined />}
                    tooltip={t('common.edit')}
                    onClick={() => {
                      history.push(`/profiles/${profile.id}`)
                    }}
                    name="crudEdit"
                  />
                </ActionButtons>
              )
            }
          })
        : {}
    ],
    [tableUtils, t, isEditorUser, selectedTab, dispatch]
  )

  const resetFilters = (): void => {
    dispatch(profileListActions.resetProfilesFilters())
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
