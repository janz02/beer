import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { UserAccess, UserType } from 'models/user'
import { message } from 'antd'
import i18n from 'app/i18n'
import { Roles } from 'api/swagger/models'

interface UserAccessListState {
  nkmUsers: UserAccess[]
  partnerUsers: UserAccess[]
  nkmListParams: ListRequestParams
  partnerListParams: ListRequestParams
  nkmLoading: boolean
  partnerLoading: boolean
  loadingSave: boolean
  loadingEditor: boolean
  editedUser?: UserAccess
  errorList: string
  errorDeletion: string
  errorEditor: string
}

const initialState: UserAccessListState = {
  nkmUsers: [],
  partnerUsers: [],
  nkmListParams: {
    pageSize: 10
  },
  partnerListParams: {
    pageSize: 10
  },
  nkmLoading: false,
  partnerLoading: false,
  loadingEditor: false,
  loadingSave: false,
  errorList: '',
  errorDeletion: '',
  errorEditor: ''
}

const userAccessListSlice = createSlice({
  name: 'usersAccessList',
  initialState,
  reducers: {
    reset: () => initialState,
    getNkmUsersRequest(state) {
      state.nkmLoading = true
    },
    getNkmUsersSuccess(
      state,
      action: PayloadAction<{ users: UserAccess[]; listParams: ListRequestParams }>
    ) {
      state.nkmUsers = action.payload.users
      state.nkmListParams = action.payload.listParams
      state.nkmLoading = false
      state.errorList = ''
    },
    getNkmUsersFail(state, action: PayloadAction<string>) {
      state.nkmLoading = false
      state.errorList = action.payload
    },

    getPartnerUsersRequest(state) {
      state.partnerLoading = true
    },
    getPartnerUsersSuccess(
      state,
      action: PayloadAction<{ users: UserAccess[]; listParams: ListRequestParams }>
    ) {
      state.partnerUsers = action.payload.users
      state.partnerListParams = action.payload.listParams
      state.partnerLoading = false
      state.errorList = ''
    },
    getPartnerUsersFail(state, action: PayloadAction<string>) {
      state.partnerLoading = false
      state.errorList = action.payload
    },

    getUserRequest(state) {
      state.loadingEditor = true
    },
    getUserSuccess(state, action: PayloadAction<UserAccess>) {
      state.editedUser = action.payload
      state.loadingEditor = false
      state.errorDeletion = ''
    },
    getUserFail(state, action: PayloadAction<string>) {
      state.partnerLoading = false
      state.errorDeletion = action.payload
    },

    saveUserRequest(state) {
      state.loadingSave = true
    },
    saveUserSuccess(state) {
      state.loadingSave = false
      state.errorEditor = ''
    },
    saveUserFail(state, action: PayloadAction<string>) {
      state.loadingSave = false
      state.errorEditor = action.payload
    },

    clearUserAccessEditor(state) {
      state.editedUser = undefined
      state.errorEditor = ''
      state.loadingEditor = false
      state.loadingSave = false
    }
  }
})

const { getNkmUsersFail, getNkmUsersRequest, getNkmUsersSuccess } = userAccessListSlice.actions
const {
  getPartnerUsersFail,
  getPartnerUsersRequest,
  getPartnerUsersSuccess
} = userAccessListSlice.actions
const { getUserRequest, getUserSuccess, getUserFail } = userAccessListSlice.actions
const { saveUserRequest, saveUserSuccess, saveUserFail } = userAccessListSlice.actions
const { clearUserAccessEditor, reset } = userAccessListSlice.actions

const getNkmUsers = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(getNkmUsersRequest())
    const revisedParams = reviseListRequestParams(getState().userAccessList.nkmListParams, params)
    const { result, ...pagination } = await api.auth.getNkmPartnerContactsInfo(revisedParams)
    dispatch(
      getNkmUsersSuccess({
        users: result as UserAccess[],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(getNkmUsersFail(err.toString()))
  }
}

const getPartnerUsers = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getPartnerUsersRequest())
    const revisedParams = reviseListRequestParams(
      getState().userAccessList.partnerListParams,
      params
    )
    const { result, ...pagination } = await api.auth.getPartnerContactsInfo(revisedParams)

    dispatch(
      getPartnerUsersSuccess({
        users: result as UserAccess[],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(getPartnerUsersFail(err.toString()))
  }
}

const getUserAccess = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getUserRequest())
    const response = await api.auth.getPartnerContactInfo({ id })
    dispatch(getUserSuccess({ ...response } as UserAccess))
  } catch (err) {
    dispatch(getUserFail(err.toString()))
  }
}

const saveUserAccess = (
  id: number,
  role: Roles,
  isActive: boolean,
  type?: UserType
): AppThunk => async dispatch => {
  try {
    dispatch(saveUserRequest())
    await api.auth.updatePartnerContactInfo({ id, partnerContactStateDto: { role, isActive } })
    message.success(i18n.t('user-access.msg.change-succesful'))
    dispatch(saveUserSuccess())
    if (type === UserType.NKM) {
      dispatch(getNkmUsers())
    } else if (type === UserType.PARTNER) {
      dispatch(getPartnerUsers())
    }
    return true
  } catch (err) {
    dispatch(saveUserFail(err.toString()))
    return false
  }
}

export const userAccessListReducer = userAccessListSlice.reducer

export const userAccessListActions = {
  saveUserAccess,
  getUserAccess,
  getNkmUsers,
  getPartnerUsers,
  clearUserAccessEditor,
  reset
}
