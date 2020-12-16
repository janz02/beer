import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { FormUtils, useFormUtils } from 'hooks/useFormUtils'
import { ColumnConfigParams, FilterMode, useTableUtils } from 'hooks/useTableUtils'
import { Company } from 'models/company'
import { Group } from 'models/group'
import { JobRole } from 'models/jobRole'
import { Profile } from 'models/profile'
import { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import {
  getProfile,
  ProfileForm,
  resetProfilePage,
  saveProfile,
  profilePageActions
} from './profilePageSlice'

export interface ProfileUtils {
  formUtils: FormUtils
  submitable: boolean
  modified: boolean
  saving: boolean
  profile?: Profile
  profilePictureUrl?: any
  companies: Company[]
  groups: Group[]
  jobRoles: JobRole[]
  isEditMode: boolean
  isOwnProfile: boolean
  loading: boolean
  error: boolean
  activityTableUtils: any
  checkFieldsChange: () => void
  resetFormFlags: () => void
  handleSave: (values: ProfileForm) => void
  setEditMode: (isEditMode: boolean) => void
  handleCancel: () => void
}

export const useProfileUtils = (id?: number): ProfileUtils => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const location = useLocation()
  const {
    profile,
    companies,
    groups,
    jobRoles,
    saving,
    isEditMode,
    profilePictureUrl,
    loading,
    error
  } = useSelector((state: RootState) => state.profilePage)

  const isOwnProfile = useMemo(() => location.pathname === '/me', [location])
  const formUtils = useFormUtils<Partial<ProfileForm>>()
  const { submitable, modified, setFieldsValue, checkFieldsChange, resetFormFlags } = formUtils
  const columnParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        key: 'activity',
        title: t('activity-table.field.activity'),
        sort: true
      },
      {
        key: 'createdDate',
        title: t('activity-table.field.date-of-activity'),
        sort: true,
        renderMode: 'date time',
        filterMode: FilterMode.DATEPICKER,
        ellipsis: false
      },
      {
        key: 'type',
        title: t('activity-table.field.type'),
        sort: true
      },
      {
        key: 'name',
        title: t('activity-table.field.name'),
        sort: true
      },
      {
        key: 'status',
        title: t('activity-table.field.status'),
        sort: true,
        filterMode: FilterMode.ENUM,
        filterMultiple: true
      }
    ],
    [t]
  )

  const tableUtils = useTableUtils<Profile>({
    listParamsState: {},
    getDataAction: () => ({}),
    columnParams
  })

  const activityTableUtils = useMemo(() => {
    return {
      columns: columnParams,
      dataSource: [],
      pagination: tableUtils.paginationConfig,
      onChange: tableUtils.handleTableChange
    }
  }, [tableUtils, columnParams])

  useEffect(() => {
    if (id) {
      dispatch(getProfile(id))
    }

    return () => {
      dispatch(resetProfilePage())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (profile) {
      let phoneNumberWithoutCountry = profile.phoneNumber
      if (phoneNumberWithoutCountry.startsWith('+36')) {
        phoneNumberWithoutCountry = phoneNumberWithoutCountry.substring(3)
      }

      setFieldsValue({
        name: profile.name,
        email: profile.email,
        birthDay: profile.birthDay,
        companyId: profile.companyId,
        groupIds: profile.groupIds,
        jobRoleId: profile.jobRoleId,
        phoneNumberWithoutCountry
      })
    } else {
      setFieldsValue({})
    }
  }, [profile, setFieldsValue])

  const handleSave = (values: ProfileForm): void => {
    resetFormFlags()
    dispatch(saveProfile(values))
  }

  const setEditMode = useCallback(
    (isEditMode: boolean): void => {
      dispatch(profilePageActions.setEditMode({ isEditMode }))
    },
    [dispatch]
  )

  const handleCancel = useCallback((): void => {
    resetFormFlags()
    setEditMode(false)
  }, [setEditMode, resetFormFlags])

  return {
    loading,
    formUtils,
    submitable,
    modified,
    saving,
    profile,
    companies,
    groups,
    jobRoles,
    checkFieldsChange,
    resetFormFlags,
    handleSave,
    isEditMode,
    setEditMode,
    handleCancel,
    isOwnProfile,
    profilePictureUrl,
    activityTableUtils,
    error
  }
}
