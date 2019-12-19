import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { history } from 'app/router';


const signupSlice = createSlice({
  name: '@auth/signup',
  initialState: {
    isLoading: false,
    error: null as any
  },
  reducers: {
    signupRequest(state, action: PayloadAction<any>) {
      state.isLoading = true
    },
    signupSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false
      state.error = null
    },
    signupFail(state, action: PayloadAction<any>) {
      state.isLoading = false
      state.error = action.payload
    },
  },
})


const passwordRecoverySlice = createSlice({
  name: '@auth/passwordRecovery',
  initialState: {
    isLoading: false
  },
  reducers: {
    passwordRecoveryRequest(state, action: PayloadAction<any>) {
      state.isLoading = true
    },
    passwordRecoverySuccess(state, action: PayloadAction<any>) {
      state.isLoading = false
    }
  },
})


const loginSlice = createSlice({
  name: '@auth/login',
  initialState: {
    isLoading: false,
    error: null as any,
  },
  reducers: {
    loginRequest(state, action: PayloadAction<any>) {
      state.isLoading = true
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false
      state.error = null
    },
    loginFail(state, action: PayloadAction<any>) {
      state.isLoading = false
      state.error = action.payload
    },
  },
})


const userSlice = createSlice({
  name: '@auth/user',
  initialState: {
    isLoggedIn: false,
    userData: null as any
  },
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.isLoggedIn = true
      state.userData = action.payload
    },
    clearUser(state) {
      state.isLoggedIn = false
      state.userData = null
    }
  },
})


// TODO: Only for simulating async actions, remove after API is connected
const delay = (p: any) => new Promise(resolve => {
  setTimeout(() => { resolve(p) }, 1000);
})


const doLogin = (params: any): AppThunk => async dispatch => {
  const { loginRequest, loginSuccess, loginFail } = loginSlice.actions
  const { setUser, clearUser } = userSlice.actions
  dispatch(loginRequest())

  try {
    const userData = await delay(params)
    dispatch(setUser(userData))
    dispatch(loginSuccess(userData))
    history.push('/')
  } catch (err) {
    dispatch(clearUser())
    dispatch(loginFail(err.toString()))
  }
}

const doLogout = (): AppThunk => async dispatch => {
  const { clearUser } = userSlice.actions
  dispatch(clearUser())
}

const doRecoverPassword = (params: any): AppThunk => async dispatch => {
  const { passwordRecoveryRequest, passwordRecoverySuccess } = passwordRecoverySlice.actions
  dispatch(passwordRecoveryRequest())
  await delay(params)
  dispatch(passwordRecoverySuccess())
}


const doSignUp = (params: any): AppThunk => async dispatch => {
  const { signupRequest, signupSuccess } = signupSlice.actions
  dispatch(signupRequest())
  await delay(params)
  dispatch(signupSuccess())
}


export { doLogin, doLogout, doRecoverPassword, doSignUp }
export default combineReducers({
  login: loginSlice.reducer,
  passwordRecovery: passwordRecoverySlice.reducer,
  signup: signupSlice.reducer,
  user: userSlice.reducer
});
