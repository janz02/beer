import { profileActions } from './profileSlice'
import { getMyPartner } from 'features/partners/selfPartner/selfPartnerSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { changePassword } from 'features/auth/authSlice'
import { useFormUtils } from 'hooks/useFormUtils'
import { FormInstance } from 'antd/lib/form'
import { useCallback } from 'react'

export interface ProfileUtils {
  editable?: boolean
  loading: boolean
  modified: boolean
  submitable: boolean
  form: FormInstance
  getProfile: typeof profileActions.getProfile
  getMyPartner: typeof getMyPartner
  prepareFormFields: () => void
  checkFieldsChange: () => void
  handleFinish: (values: any) => void
}

export const useProfileUtils = (): ProfileUtils => {
  const dispatch = useDispatch()
  const { partner } = useSelector((state: RootState) => state.selfPartner)
  const { profile, featureState, editable } = useSelector((state: RootState) => state.profile)
  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setFieldsValue,
    resetFormFields
  } = useFormUtils()

  const loading = featureState === FeatureState.Loading

  const handleFinish = (values: any): void => {
    dispatch(profileActions.updateProfile({ ...values }))

    const password = values.password
    const oldPassword = values.oldPassword
    if (password && oldPassword) {
      dispatch(changePassword(password, oldPassword))
    }

    resetFormFlags()
  }

  const prepareFormFields = useCallback(() => {
    setFieldsValue({
      ...profile,
      registerCode: partner?.registerCode
    })
    resetFormFields(['oldPassword', 'password', 'passwordAgain'])
  }, [setFieldsValue, resetFormFields, partner, profile])

  return {
    editable,
    loading,
    modified,
    submitable,
    form,
    getProfile: profileActions.getProfile,
    getMyPartner: getMyPartner,
    prepareFormFields,
    checkFieldsChange,
    handleFinish
  }
}
