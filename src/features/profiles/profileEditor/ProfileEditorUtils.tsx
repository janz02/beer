import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { FormUtils, useFormUtils } from 'hooks/useFormUtils'
import { Company } from 'models/company'
import { Group } from 'models/group'
import { JobRole } from 'models/jobRole'
import { Profile } from 'models/profile'
import { useEffect } from 'react'
import { getProfile, resetProfileEditor, saveProfile } from './profileEditorSlice'

export interface ProfileEditorPageUtils {
  formUtils: FormUtils
  submitable: boolean
  modified: boolean
  saving: boolean
  profile?: Profile
  companies: Company[]
  groups: Group[]
  jobRoles: JobRole[]
  checkFieldsChange: () => void
  resetFormFlags: () => void
  handleSave: (values: Profile) => void
}

export const useProfileEditorPageUtils = (id?: number): ProfileEditorPageUtils => {
  const dispatch = useDispatch()
  const { profile, companies, groups, jobRoles, saving } = useSelector(
    (state: RootState) => state.profileEditor
  )

  useEffect(() => {
    if (id) {
      dispatch(getProfile(id))
    }

    return () => {
      dispatch(resetProfileEditor())
    }
  }, [dispatch, id])

  const formUtils = useFormUtils<Partial<Profile>>()
  const { submitable, modified, setFieldsValue, checkFieldsChange, resetFormFlags } = formUtils

  useEffect(() => {
    setFieldsValue(profile || {})
  }, [profile, setFieldsValue])

  const handleSave = (values: Profile): void => {
    resetFormFlags()
    dispatch(saveProfile(values))
  }

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
    handleSave
  }
}
