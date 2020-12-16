import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { FormUtils, useFormUtils } from 'hooks/useFormUtils'
import { Company } from 'models/company'
import { Group } from 'models/group'
import { JobRole } from 'models/jobRole'
import { Profile } from 'models/profile'
import { useCallback, useEffect, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
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
  checkFieldsChange: () => void
  resetFormFlags: () => void
  handleSave: (values: ProfileForm) => void
  setEditMode: (isEditMode: boolean) => void
  handleCancel: () => void
}

export const useProfileUtils = (id?: number): ProfileUtils => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const {
    profile,
    companies,
    groups,
    jobRoles,
    saving,
    isEditMode,
    profilePictureUrl
  } = useSelector((state: RootState) => state.profilePage)

  const isOwnProfile = useMemo(() => location.pathname.includes('my-profile'), [location])

  useEffect(() => {
    if (id) {
      dispatch(getProfile(id))
    }

    return () => {
      dispatch(resetProfilePage())
    }
  }, [dispatch, id])

  const formUtils = useFormUtils<Partial<ProfileForm>>()
  const { submitable, modified, setFieldsValue, checkFieldsChange, resetFormFlags } = formUtils

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

    if (!isOwnProfile) {
      history.goBack()
    }
  }, [setEditMode, isOwnProfile, history, resetFormFlags])

  return {
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
    profilePictureUrl
  }
}
