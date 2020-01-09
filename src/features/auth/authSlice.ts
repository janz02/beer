import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { history } from 'app/router';
import api from 'api';
import { AuthLoginRequest } from 'api/swagger/apis';
import { UserVm } from 'api/swagger';

interface UserData {}

const authSlice = createSlice({
  name: '@auth',
  initialState: {
    loggedIn: false,
    userData: {} as UserData,
    loadingSignup: false,
    loadingPasswordRecovery: false,
    loadingLogin: false,
    errorSignup: null as any,
    errorLogin: null as any,
    errorPasswordRecovery: null as any,
  },
  reducers: {
    signupRequest(state) {
      state.loadingSignup = true;
    },
    signupSuccess(state) {
      state.loadingSignup = false;
      state.errorSignup = null;
    },
    signupFail(state, action: PayloadAction<string>) {
      state.loadingSignup = false;
      state.errorSignup = action.payload;
    },
    passwordRecoveryRequest(state) {
      state.loadingPasswordRecovery = true;
    },
    passwordRecoverySuccess(state) {
      state.loadingPasswordRecovery = false;
      state.errorPasswordRecovery = null;
    },
    passwordRecoveryFail(state, action: PayloadAction<string>) {
      state.loadingPasswordRecovery = false;
      state.errorPasswordRecovery = action.payload;
    },
    loginRequest(state) {
      state.loadingLogin = true;
    },
    loginSuccess(state, action: PayloadAction<UserVm>) {
      state.loadingLogin = false;
      state.errorLogin = null;
      state.loggedIn = true;
      state.userData = action.payload;
      sessionStorage.setItem("jwt", action.payload.token!)
    },
    loginFail(state, action: PayloadAction<string>) {
      state.loadingLogin = false;
      state.errorLogin = action.payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.userData = {};
    },
  },
});

// TODO: Only for simulating async actions, remove after API is connected
const delay = (p: any) =>
  new Promise(resolve => {
    console.log('mock api call', p);
    setTimeout(() => {
      resolve(p);
    }, 1000);
  });

const login = (params: any): AppThunk => async (dispatch, state) => {
  dispatch(loginRequest());
  try {

    const loginRequest: AuthLoginRequest = {
      userDto: {
        email: params.username,
        password: params.password
      }
    }

    const userData:UserVm  = await api.auth.authLogin(loginRequest);
    const cameFrom = state().routerHistory.cameFrom;

    dispatch(loginSuccess(userData));

    history.push(cameFrom);
  } catch (err) {
    dispatch(loginFail(err.toString()));
  }
};

const recoverPassword = (params: any): AppThunk => async dispatch => {
  dispatch(passwordRecoveryRequest());
  try {
    await delay(params);
    dispatch(passwordRecoverySuccess());
  } catch (err) {
    dispatch(passwordRecoveryFail(err.toString()));
  }
};

const signUp = (params: any): AppThunk => async dispatch => {
  dispatch(signupRequest());
  try {
    await delay(params);
    dispatch(signupSuccess());
    dispatch(login(params as UserData));
  } catch (err) {
    dispatch(signupFail(err.toString()));
  }
};

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
  logout,
} = authSlice.actions;

export { login, recoverPassword, signUp };

export default authSlice.reducer;
