import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { history } from 'router/router'
import { LoginRequest, RegisterPartnerContactRequest, UserVm } from 'api/swagger/coupon'
import { getJwtUserdata, isLoggedIn } from 'services/jwt-reader'
import { api } from 'api'
import JwtDecode from 'jwt-decode'
import { message } from 'antd'
import i18n from 'app/i18n'
import { hardResetStore } from 'app/storeUtils'
import { Partner } from 'models/partner'
import { UserData } from 'models/user'
import { PartnerContact } from 'models/partnerContact'
import { FeatureState } from 'models/featureState'

const clearJwtData = (): void => {
  sessionStorage.removeItem('jwt')
  sessionStorage.removeItem('refreshToken')
  sessionStorage.removeItem('jwtExpiration')
  sessionStorage.removeItem('partnerId')
  sessionStorage.removeItem('partnerName')
  sessionStorage.removeItem('userId')
}

interface AuthState {
  loggedIn: boolean
  userData: UserData
  featureState: FeatureState
}

const initialState = (): AuthState => ({
  loggedIn: isLoggedIn(),
  userData: getJwtUserdata(),
  featureState: FeatureState.Initial
})

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState(),
  reducers: {
    resetAuth: () => initialState(),
    setFeatureState(state, action: PayloadAction<FeatureState>) {
      state.featureState = action.payload
    },
    signupSuccess(state) {
      state.featureState = FeatureState.Success
    },
    passwordRecoverySuccess(state) {
      state.featureState = FeatureState.Success
    },
    loginSuccess(state, action: PayloadAction<UserVm>) {
      state.featureState = FeatureState.Success

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
    loginFail(state) {
      state.featureState = FeatureState.Error

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
    setSelfPartnerContact(state, action: PayloadAction<PartnerContact>) {
      sessionStorage.setItem('userId', `${action.payload.id}`)
      state.userData = {
        ...state.userData,
        id: action.payload.id
      }
    },
    logoutUser(state) {
      state.loggedIn = false
      state.userData = {}
      clearJwtData()
    },
    changePasswordSuccess(state) {
      message.success(i18n.t('auth.change-password-success'), 10)
      state.featureState = FeatureState.Success
    }
  }
})

const {
  resetAuth,
  setFeatureState,
  loginSuccess,
  loginFail,
  passwordRecoverySuccess,
  signupSuccess,
  logoutUser,
  changePasswordSuccess,
  setSelfPartner,
  setSelfPartnerContact
} = authSlice.actions

export const login = (params: any): AppThunk => async (dispatch, state) => {
  dispatch(hardResetStore())
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    const loginRequest: LoginRequest = {
      loginDto: {
        email: params.username,
        password: params.password
      }
    }

    const userVm = await api.coupon.auth.login(loginRequest)
    const cameFrom = state().routerHistory.cameFrom
    dispatch(loginSuccess(userVm))

    const partner = await api.coupon.partner.getMyPartner()
    dispatch(setSelfPartner({ id: partner.id, name: partner.name }))

    const contact = await api.coupon.partnerContacts.getMyPartnerContact()
    dispatch(setSelfPartnerContact({ id: contact.id }))

    if (!cameFrom.includes('error')) {
      history.push(cameFrom)
      return
    }

    history.push('/')
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

export const logout = (): AppThunk => async dispatch => {
  dispatch(logoutUser())
  dispatch(hardResetStore({ logout: true }))
}

export const recoverPassword = (): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    dispatch(passwordRecoverySuccess())
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

export const signUp = (params: any): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

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
    await api.coupon.auth.registerPartnerContact(requestRequest)

    dispatch(signupSuccess())
    dispatch(login(params))
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

export const changePassword = (
  newPassword: string,
  oldPassword: string
): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    await api.coupon.auth.changePassword({ changePasswordDto: { newPassword, oldPassword } })

    dispatch(changePasswordSuccess())
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

export const authActionType = {
  loginSuccess: authSlice.actions.loginSuccess.toString(),
  logout: authSlice.actions.logoutUser.toString()
}

export const authActions = {
  resetAuth,
  loginFail,
  login,
  logout,
  recoverPassword,
  signUp,
  changePassword
}

export const authReducer = authSlice.reducer
