import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { history } from 'router/router'
import { LoginRequest, RegisterRequest } from 'api/swagger/apis'
import { UserVm } from 'api/swagger'
import { getJwtUserdata } from 'services/jwt-reader'
import { api } from 'api'

const authSlice = createSlice({
  name: '@auth',
  initialState: {
    loggedIn: !!sessionStorage.getItem('jwt'),
    userData: getJwtUserdata(),
    loadingSignup: false,
    loadingPasswordRecovery: false,
    loadingLogin: false,
    errorSignup: '',
    errorLogin: '',
    errorPasswordRecovery: ''
  },
  reducers: {
    signupRequest(state) {
      state.loadingSignup = true
    },
    signupSuccess(state) {
      state.loadingSignup = false
      state.errorSignup = ''
    },
    signupFail(state, action: PayloadAction<string>) {
      state.loadingSignup = false
      state.errorSignup = action.payload
    },
    passwordRecoveryRequest(state) {
      state.loadingPasswordRecovery = true
    },
    passwordRecoverySuccess(state) {
      state.loadingPasswordRecovery = false
      state.errorPasswordRecovery = ''
    },
    passwordRecoveryFail(state, action: PayloadAction<string>) {
      state.loadingPasswordRecovery = false
      state.errorPasswordRecovery = action.payload
    },
    loginRequest(state) {
      state.loadingLogin = true
    },
    loginSuccess(state, action: PayloadAction<UserVm>) {
      state.loadingLogin = false
      state.errorLogin = ''
      state.loggedIn = true
      const token = action.payload.jwtToken

      if (token) {
        sessionStorage.setItem('jwt', token)
        state.userData = getJwtUserdata(token)
      }
    },
    loginFail(state, action: PayloadAction<string>) {
      state.loadingLogin = false
      state.errorLogin = action.payload
      sessionStorage.removeItem('jwt')
    },
    logout(state) {
      state.loggedIn = false
      state.userData = {}
      sessionStorage.removeItem('jwt')
    }
  }
})

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  passwordRecoveryRequest,
  passwordRecoverySuccess,
  passwordRecoveryFail,
  signupRequest,
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
  dispatch(loginRequest())
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
  dispatch(passwordRecoveryRequest())
  try {
    await delay(params)
    dispatch(passwordRecoverySuccess())
  } catch (err) {
    dispatch(passwordRecoveryFail(err.toString()))
  }
}

export const signUp = (params: any): AppThunk => async dispatch => {
  dispatch(signupRequest())

  const requestRequest: RegisterRequest = {
    registerDto: {
      email: params.username,
      password: params.password,
      partnerName: params.company,
      fullName: params.name,
      phone: +params.phone
    }
  }

  try {
    // Register
    await api.auth.register(requestRequest)

    dispatch(signupSuccess())

    // Login after it
    dispatch(login(params))
  } catch (err) {
    dispatch(signupFail(err.toString()))
  }
}
