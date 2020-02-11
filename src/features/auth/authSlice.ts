import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { history } from 'router/router'
import { LoginRequest, RegisterPartnerRequest } from 'api/swagger/apis'
import { UserVm } from 'api/swagger'
import { getJwtUserdata } from 'services/jwt-reader'
import { api } from 'api'
import JwtDecode from 'jwt-decode'

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
  logout
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

  const requestRequest: RegisterPartnerRequest = {
    registerPartnerDto: {
      email: params.username,
      password: params.password,
      partnerName: params.company,
      fullName: params.name,
      phone: +params.phone,
      code: params.code
    }
  }

  try {
    // Register
    await api.auth.registerPartner(requestRequest)

    dispatch(signupSuccess())

    // Login after it
    dispatch(login(params))
  } catch (err) {
    dispatch(signupFail(err.toString()))
  }
}
