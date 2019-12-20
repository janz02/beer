import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { history } from 'app/router';

const signupSlice = createSlice({
  name: '@auth/signup',
  initialState: {
    loading: false,
    error: null as any,
  },
  reducers: {
    signupRequest(state) {
      state.loading = true;
    },
    signupSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    signupFail(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const passwordRecoverySlice = createSlice({
  name: '@auth/passwordRecovery',
  initialState: {
    loading: false,
  },
  reducers: {
    passwordRecoveryRequest(state) {
      state.loading = true;
    },
    passwordRecoverySuccess(state) {
      state.loading = false;
    },
  },
});

const loginSlice = createSlice({
  name: '@auth/login',
  initialState: {
    loading: false,
    error: null as any,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    loginFail(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const userSlice = createSlice({
  name: '@auth/user',
  initialState: {
    loggedIn: true,
    userData: null as any,
  },
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.loggedIn = true;
      state.userData = action.payload;
    },
    clearUser(state) {
      state.loggedIn = false;
      state.userData = null;
    },
  },
});

// TODO: Only for simulating async actions, remove after API is connected
const delay = (p: any) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(p);
    }, 1000);
  });

const login = (params: any): AppThunk => async dispatch => {
  dispatch(loginRequest());
  try {
    const userData = await delay(params);
    dispatch(setUser(userData));
    dispatch(loginSuccess());
    history.push('/');
  } catch (err) {
    dispatch(clearUser());
    dispatch(loginFail(err.toString()));
  }
};

const logout = (): AppThunk => async dispatch => {
  const { clearUser } = userSlice.actions;
  dispatch(clearUser());
};

const recoverPassword = (params: any): AppThunk => async dispatch => {
  dispatch(passwordRecoveryRequest());
  await delay(params);
  dispatch(passwordRecoverySuccess());
};

const signUp = (params: any): AppThunk => async dispatch => {
  dispatch(signupRequest());
  await delay(params);
  dispatch(signupSuccess());
};

export const { signupRequest, signupSuccess } = signupSlice.actions;

export const {
  passwordRecoveryRequest,
  passwordRecoverySuccess,
} = passwordRecoverySlice.actions;

export const { loginRequest, loginSuccess, loginFail } = loginSlice.actions;

export const { setUser, clearUser } = userSlice.actions;

export { login, logout, recoverPassword, signUp };

export default combineReducers({
  login: loginSlice.reducer,
  passwordRecovery: passwordRecoverySlice.reducer,
  signup: signupSlice.reducer,
  user: userSlice.reducer,
});
