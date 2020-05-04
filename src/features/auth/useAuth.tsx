import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { authActions } from './authSlice'

interface UseAuthFeatures {
  loading: boolean
  handleLogin: (values: any) => void
  handleSignup: (values: any) => void
  handleRecoverPassword: () => void
}

export const useAuth = (): UseAuthFeatures => {
  const dispatch = useDispatch()
  const { featureState } = useSelector((state: RootState) => state.auth)

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
    loading,
    handleLogin,
    handleSignup,
    handleRecoverPassword
  }
}
