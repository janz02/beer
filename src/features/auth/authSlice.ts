import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { history } from 'router/router'
import { LoginRequest, RegisterPartnerContactRequest } from 'api/swagger/apis'
import { UserVm } from 'api/swagger'
import { getJwtUserdata, isLoggedIn } from 'services/jwt-reader'
import { api } from 'api'
import JwtDecode from 'jwt-decode'
import { message } from 'antd'
import i18n from 'app/i18n'
import { hardResetStore } from 'app/storeUtils'
import { Partner } from 'models/partner'
import { UserData } from 'models/user'

const clearJwtData = (): void => {
  sessionStorage.removeItem('jwt')
  sessionStorage.removeItem('refreshToken')
  sessionStorage.removeItem('jwtExpiration')
  sessionStorage.removeItem('partnerId')
  sessionStorage.removeItem('partnerName')
}

interface AuthState {
  loggedIn: boolean
  userData: UserData
  loading: boolean
  errorSignup: string
  errorLogin: string
  errorChangePassword: string
  errorPasswordRecovery: string
}

const initialState = (): AuthState => ({
  loggedIn: isLoggedIn(),
  userData: getJwtUserdata(),
  loading: false,
  errorSignup: '',
  errorLogin: '',
  errorChangePassword: '',
  errorPasswordRecovery: ''
})

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState(),
  reducers: {
    resetAuth: () => initialState(),
    setLoadingStart(state) {
      state.loading = true
    },
    signupSuccess(state) {
      state.loading = false
      state.errorSignup = ''
    },
    signupFail(state, action: PayloadAction<string>) {
      state.loading = false
      state.errorSignup = action.payload
    },
    passwordRecoverySuccess(state) {
      state.loading = false
      state.errorPasswordRecovery = ''
    },
    passwordRecoveryFail(state, action: PayloadAction<string>) {
      state.loading = false
      state.errorPasswordRecovery = action.payload
    },
    loginSuccess(state, action: PayloadAction<UserVm>) {
      state.loading = false
      state.errorLogin = ''
      state.loggedIn = true
      const jwt = action.payload.jwtToken
      const refreshToken = action.payload.refreshToken
      const decodedJwt: any = jwt && JwtDecode(jwt)
      const jwtExpiration = decodedJwt?.exp

      jwt && sessionStorage.setItem('jwt', jwt)
      refreshToken && sessionStorage.setItem('refreshToken', refreshToken)

      // Also correcting precision.
      jwtExpiration && sessionStorage.setItem('jwtExpiration', `${jwtExpiration}000`)
      state.userData = getJwtUserdata(jwt)
    },
    loginFail(state, action: PayloadAction<string>) {
      state.loading = false
      state.errorLogin = action.payload
      clearJwtData()
    },
    setSelfPartner(state, action: PayloadAction<Partner>) {
      sessionStorage.setItem('partnerId', `${action.payload.id}`)
      sessionStorage.setItem('partnerName', `${action.payload.name}`)
      state.userData = {
        ...state.userData,
        partnerId: action.payload.id,
        partnerName: action.payload.name
      }
    },
    logoutUser(state) {
      state.loggedIn = false
      state.userData = {}
      clearJwtData()
    },
    changePasswordSuccess(state) {
      message.success(i18n.t('auth.change-password-success'), 10)
      state.loading = false
      state.errorChangePassword = ''
    },
    changePasswordFail(state, action: PayloadAction<string>) {
      state.loading = false
      state.errorChangePassword = action.payload
    }
  }
})

const {
  setLoadingStart,
  loginSuccess,
  loginFail,
  passwordRecoverySuccess,
  passwordRecoveryFail,
  signupSuccess,
  signupFail,
  logoutUser,
  changePasswordSuccess,
  changePasswordFail,
  setSelfPartner
} = authSlice.actions

export const { resetAuth } = authSlice.actions

export const authReducer = authSlice.reducer

export const login = (params: any): AppThunk => async (dispatch, state) => {
  dispatch(hardResetStore())
  dispatch(setLoadingStart())
  try {
    const loginRequest: LoginRequest = {
      loginDto: {
        email: params.username,
        password: params.password
      }
    }

    const userVm = await api.auth.login(loginRequest)
    const cameFrom = state().routerHistory.cameFrom
    dispatch(loginSuccess(userVm))

    const partner = await api.partner.getSelfPartner()
    dispatch(setSelfPartner(partner))

    if (!cameFrom.includes('error')) {
      history.push(cameFrom)
      return
    }

    history.push('/')
  } catch (err) {
    dispatch(loginFail(err.toString()))
  }
}

export const logout = (): AppThunk => async dispatch => {
  dispatch(logoutUser())
  dispatch(hardResetStore({ logout: true }))
}

export const recoverPassword = (params: any): AppThunk => async dispatch => {
  dispatch(setLoadingStart())
  try {
    dispatch(passwordRecoverySuccess())
  } catch (err) {
    dispatch(passwordRecoveryFail(err.toString()))
  }
}

export const signUp = (params: any): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  const requestRequest: RegisterPartnerContactRequest = {
    registerPartnerContactDto: {
      email: params.username,
      password: params.password,
      fullName: params.name,
      phone: params.phone,
      code: params.code,
      acceptUserAgreements: !!params.acceptTerms
    }
  }

  try {
    await api.auth.registerPartnerContact(requestRequest)

    dispatch(signupSuccess())
    dispatch(login(params))
  } catch (err) {
    dispatch(signupFail(err.toString()))
  }
}

export const changePassword = (
  newPassword: string,
  oldPassword: string
): AppThunk => async dispatch => {
  dispatch(setLoadingStart())
  try {
    await api.auth.changePassword({ changePasswordDto: { newPassword, oldPassword } })

    dispatch(changePasswordSuccess())
  } catch (err) {
    dispatch(changePasswordFail(err.toString()))
  }
}
