import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { history } from 'router/router'
import { LoginRequest, RegisterPartnerContactRequest } from 'api/swagger/apis'
import { UserVm } from 'api/swagger'
import { getJwtUserdata } from 'services/jwt-reader'
import { api } from 'api'
import JwtDecode from 'jwt-decode'
import { message } from 'antd'
import i18n from 'app/i18n'

const clearJwtData = (): void => {
  sessionStorage.removeItem('jwt')
  sessionStorage.removeItem('refreshToken')
  sessionStorage.removeItem('jwtExpiration')
}

const authSlice = createSlice({
  name: '@auth',
  initialState: {
    loggedIn: !!sessionStorage.getItem('jwt'),
    userData: getJwtUserdata(),
    loading: false,
    errorSignup: '',
    errorLogin: '',
    errorChangePassword: '',
    errorPasswordRecovery: ''
  },
  reducers: {
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
    logout(state) {
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

export const {
  setLoadingStart,
  loginSuccess,
  loginFail,
  passwordRecoverySuccess,
  passwordRecoveryFail,
  signupSuccess,
  signupFail,
  logout,
  changePasswordSuccess,
  changePasswordFail
} = authSlice.actions

export default authSlice.reducer

// TODO: Only for simulating async actions, remove after API is connected
const delay = (p: any): Promise<unknown> =>
  new Promise(resolve => {
    console.log('mock api call', p)
    setTimeout(() => {
      resolve(p)
    }, 1000)
  })

export const login = (params: any): AppThunk => async (dispatch, state) => {
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

    history.push(cameFrom)
  } catch (err) {
    dispatch(loginFail(err.toString()))
  }
}

export const recoverPassword = (params: any): AppThunk => async dispatch => {
  dispatch(setLoadingStart())
  try {
    await delay(params)
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
      code: params.code
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
