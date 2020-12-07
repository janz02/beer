import { ProfileStatus } from 'api/swagger/admin'
import { RootState } from 'app/rootReducer'
import { ProfileStatusDisplay } from 'features/profiles/profileList/ProfileStatusDisplay'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { ColumnConfigParams, FilterMode, TableUtils, useTableUtils } from 'hooks/useTableUtils'
import { Group } from 'models/group'
import { Profile } from 'models/profile'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { hasPermission } from 'services/jwt-reader'
import { pageViewRoles } from 'services/roleHelpers'
import {
  cancelUnassignPermissionPopup,
  groupEditorActions,
  showUnassignPermissionPopup
} from './groupEditorSlice'

import { history } from 'router/router'
import { CampaignPermission } from 'models/campaign/campaignPermission'
import { ColumnOrderUtils, useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { Link, useParams } from 'react-router-dom'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'

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
  profileHeaderOptions: JSX.Element
  permissionIdToUnassign: number | undefined
  unassignPermissionPopupVisible: boolean
  getGroupDetails: () => void
  handleUnassignPermission: (permissionId: number | undefined) => void
  handleUnassignPermissionApprove: () => void
  handleUnassignPermissionCancel: () => void
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
    permissionTotalCount,
    permissionIdToUnassign,
    unassignPermissionPopupVisible
  } = useSelector((state: RootState) => state.groupEditor)

  const {
    getGroup,
    getGroupPermissions,
    getGroupProfiles,
    unassignProfile,
    unassignPermission
  } = groupEditorActions
  const { t } = useTranslation()

  const { id } = useParams()

  const getGroupDetails = useCallback(() => {
    if (id) {
      dispatch(getGroup(+id))
      dispatch(getGroupProfiles(+id))
      dispatch(getGroupPermissions(+id))
    }
  }, [id, dispatch, getGroup, getGroupProfiles, getGroupPermissions])

  const isEditorUser = hasPermission(pageViewRoles.organizationEditor)

  const handleUnassignProfile = useMemo(
    () => (profileId: number | undefined): void => {
      if (group?.id && profileId) {
        unassignProfile(profileId, group.id)
      }
    },
    [group, unassignProfile]
  )

  const handleUnassignPermission = useMemo(
    () => (permissionId: number | undefined): void => {
      if (group?.id && permissionId) {
        dispatch(showUnassignPermissionPopup(permissionId))
      }
    },
    [group, dispatch]
  )
  const handleUnassignPermissionCancel = (): void => {
    dispatch(cancelUnassignPermissionPopup())
  }

  const handleUnassignPermissionApprove = (): void => {
    if (id && permissionIdToUnassign) {
      dispatch(unassignPermission(+id))
    } else {
      handleUnassignPermissionCancel()
    }
  }

  const profileColumnsParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('profiles.field.status'),
        filterMode: FilterMode.ENUM,
        sort: true,
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
      },
      {
        title: t('profiles.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH,
        cannotBeHidden: true,
        ellipsis: false,
        disableSearchHighlight: true,
        render: (value: string, profile: Profile): React.ReactNode => {
          return <Link to={`/profiles/${profile.id}`}>{profile.name}</Link>
        }
      },
      {
        title: t('profiles.field.company'),
        key: 'companyName',
        sort: true,
        filterMode: FilterMode.SEARCH,
        ellipsis: false,
        disableSearchHighlight: true,
        render: (value: string, profile: Profile): React.ReactNode => {
          return (
            <Link to={`/organization/companies/${profile.companyId}`}>{profile.companyName}</Link>
          )
        }
      },
      {
        title: t('profiles.field.job-role'),
        key: 'jobRoleName',
        sort: true,
        filterMode: FilterMode.SEARCH,
        ellipsis: false,
        disableSearchHighlight: true,
        render: (value: string, profile: Profile): React.ReactNode => {
          return (
            <Link to={`/organization/job-roles/${profile.jobRoleId}`}>{profile.jobRoleName}</Link>
          )
        }
      },
      {
        title: t('profiles.field.campaigns'),
        key: 'campaignCount',
        sort: true,
        filterMode: FilterMode.SEARCH,
        ellipsis: false
      }
    ],
    [t]
  )

  const actionColumnParams = useMemo<Partial<ColumnConfigParams> | undefined>(
    () => ({
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
    }),
    [handleUnassignProfile]
  )

  const profileTableUtils = useTableUtils<Profile>({
    listParamsState: profileListParams,
    getDataAction: params => getGroupProfiles(group!.id!, params),
    columnParams: profileColumnsParams,
    actionColumnParams: actionColumnParams
  })

  const profileColumnsUtils = useColumnOrderUtils(
    profileTableUtils.columnsConfig,
    ColumnStorageName.GROUP_PROFILES
  )

  const profilesSource = useMemo(() => profileTableUtils.addKeyProp(profiles), [
    profileTableUtils,
    profiles
  ])

  const resetProfileFilters = useCallback(() => {
    if (id) {
      dispatch(groupEditorActions.resetProfilesFilters(+id))
    }
  }, [dispatch, id])

  const profileHeaderOptions = useMemo(
    () => (
      <>
        <ResetFiltersButton onClick={resetProfileFilters} />
        <ColumnOrderDropdown {...profileColumnsUtils} />
      </>
    ),
    [profileColumnsUtils, resetProfileFilters]
  )

  return {
    group,
    profiles: profilesSource,
    permissions,
    isLoading,
    isProfilesLoading,
    isPermissionsLoading,
    isEditorUser,
    profileColumnsUtils,
    profileTableUtils,
    profileHeaderOptions,
    profileTotalCount,
    permissionTotalCount,
    permissionIdToUnassign,
    unassignPermissionPopupVisible,
    getGroupDetails,
    handleUnassignPermission,
    handleUnassignPermissionApprove,
    handleUnassignPermissionCancel
  }
}
