import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { authActions } from './authSlice'
import { useParams } from 'react-router-dom'
import { FormInstance } from 'antd/lib/form'
import { useFormUtils } from 'hooks/useFormUtils'

interface UseAuthFeatures {
  form: FormInstance
  loading: boolean
  hasRegistrationCodeInUrl: boolean
  handleLogin: (values: any) => void
  handleSignup: (values: any) => void
  handleRecoverPassword: () => void
}

export const useAuth = (): UseAuthFeatures => {
  const dispatch = useDispatch()
  const { featureState } = useSelector((state: RootState) => state.auth)
  const { registrationCode } = useParams()
  const { form } = useFormUtils()

  const hasRegistrationCodeInUrl = !!registrationCode
  hasRegistrationCodeInUrl && form.setFieldsValue({ code: registrationCode })

  const loading = featureState === FeatureState.Loading

  const handleLogin = (values: any): void => {
    dispatch(authActions.login(values))
  }

  const handleSignup = (values: any): void => {
    dispatch(authActions.signUp(values))
  }

  const handleRecoverPassword = (): void => {
    dispatch(authActions.recoverPassword())
  }

  return {
    form,
    loading,
    hasRegistrationCodeInUrl,
    handleLogin,
    handleSignup,
    handleRecoverPassword
  }
}
