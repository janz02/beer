import { ColumnsType } from 'antd/lib/table'
import { ProfileStatus } from 'api/swagger/admin'
import { RootState } from 'app/rootReducer'
import { ProfileStatusDisplay } from 'features/profiles/profileList/ProfileStatusDisplay'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { FilterMode, TableUtils, useTableUtils } from 'hooks/useTableUtils'
import { Group } from 'models/group'
import { Profile } from 'models/profile'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { hasPermission } from 'services/jwt-reader'
import { pageViewRoles } from 'services/roleHelpers'
import { groupEditorActions } from './groupEditorSlice'

import { history } from 'router/router'
import { CampaignPermission } from 'models/campaign/campaignPermission'
import { ColumnOrderUtils, useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { Link, useParams } from 'react-router-dom'

export interface GroupEditorUtils {
  group?: Group
  profiles?: Profile[]
  profileTotalCount?: number
  permissions?: CampaignPermission[]
  permissionTotalCount?: number
  isLoading: boolean
  isProfilesLoading: boolean
  isPermissionsLoading: boolean
  isEditorUser: boolean
  profileTableUtils: TableUtils<Profile>
  profileColumnsUtils: ColumnOrderUtils<Profile>
  getGroupDetails: () => void
  handleUnassignRole: (roleId: number) => void
}

export const useGroupEditorUtils = (): GroupEditorUtils => {
  const dispatch = useDispatch()
  const {
    group,
    profiles,
    permissions,
    isLoading,
    isProfilesLoading,
    isPermissionsLoading,
    profileListParams,
    profileTotalCount,
    permissionTotalCount
  } = useSelector((state: RootState) => state.groupEditor)
  const { getGroup, getGroupPermissions, getGroupProfiles } = groupEditorActions
  const { t } = useTranslation()

  const { id } = useParams()

  const getGroupDetails = useCallback(() => {
    if (id && !group) {
      dispatch(getGroup(+id))
      dispatch(getGroupProfiles(+id))
      dispatch(getGroupPermissions(+id))
    }
  }, [id, group, dispatch, getGroup, getGroupProfiles, getGroupPermissions])

  const isEditorUser = hasPermission(pageViewRoles.organizationEditor)

  const handleUnassignProfile = useMemo(
    () => (profileId: number): void => {
      console.log(`unassign profile ${profileId} from group ${group?.id}`)
    },
    [group]
  )

  const handleUnassignRole = useMemo(
    () => (roleId: number): void => {
      console.log(`unassign role ${roleId} from group ${group?.id}`)
    },
    [group]
  )

  const profileTableUtils = useTableUtils<Profile>({
    listParamsState: profileListParams,
    filterKeys: ['status', 'name', 'companyName', 'jobRoleName'],
    getDataAction: params => {
      getGroupProfiles(group!.id!, params)
    }
  })

  const profileColumnsConfig: ColumnsType<Profile> = useMemo(
    () => [
      profileTableUtils.columnConfig({
        title: t('profiles.field.status'),
        filterMode: FilterMode.ENUM,
        key: 'status',
        filters: [
          { value: ProfileStatus.Active, text: t('profiles.status.active') },
          { value: ProfileStatus.InActive, text: t('profiles.status.inactive') },
          { value: ProfileStatus.Declined, text: t('profiles.status.declined') },
          {
            value: ProfileStatus.WaitingForApproval,
            text: t('profiles.status.waiting-for-approval')
          }
        ],
        cannotBeHidden: true,
        ellipsis: false,
        render(status: ProfileStatus) {
          return <ProfileStatusDisplay status={status} />
        }
      }),
      profileTableUtils.columnConfig({
        title: t('profiles.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH,
        cannotBeHidden: true,
        ellipsis: false,
        disableSearchHighlight: true,
        render: (value: string, profile: Profile): React.ReactNode => {
          return <Link to={`/profiles/${profile.id}`}>{value}</Link>
        }
      }),
      profileTableUtils.columnConfig({
        title: t('profiles.field.company'),
        key: 'companyName',
        sort: false,
        filterMode: FilterMode.SEARCH,
        ellipsis: false,
        disableSearchHighlight: true,
        render: (value: string, profile: Profile): React.ReactNode => {
          return <Link to={`/companies/${profile.companyId}`}>{value}</Link>
        }
      }),
      profileTableUtils.columnConfig({
        title: t('profiles.field.job-role'),
        key: 'jobRoleName',
        sort: false,
        filterMode: FilterMode.SEARCH,
        ellipsis: false,
        disableSearchHighlight: true,
        render: (value: string, profile: Profile): React.ReactNode => {
          return <Link to={`/job-roles/${profile.jobRoleId}`}>{value}</Link>
        }
      }),
      profileTableUtils.columnConfig({
        title: t('profiles.field.campaigns'),
        key: 'id',
        sort: true,
        filterMode: FilterMode.SEARCH,
        ellipsis: false
      }),
      isEditorUser
        ? profileTableUtils.actionColumnConfig({
            fixed: 'right',
            width: '50px',
            render(record: Profile) {
              return (
                <CrudButtons
                  onEdit={() => history.push(`/profiles/${record.id}`)}
                  onUnassign={() => handleUnassignProfile(record.id)}
                />
              )
            }
          })
        : {}
    ],
    [t, isEditorUser, profileTableUtils, handleUnassignProfile]
  )

  const profileColumnsUtils = useColumnOrderUtils(
    profileColumnsConfig,
    ColumnStorageName.GROUP_PROFILES
  )

  return {
    group,
    profiles,
    permissions,
    isLoading,
    isProfilesLoading,
    isPermissionsLoading,
    isEditorUser,
    profileColumnsUtils,
    profileTableUtils,
    profileTotalCount,
    permissionTotalCount,
    getGroupDetails,
    handleUnassignRole
  }
}
