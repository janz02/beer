import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { ListRequestParams, Pagination } from 'hooks/useTableUtils'
import { UserAccess } from 'models/user'
import { message } from 'antd'
import i18n from 'app/i18n'
import { Roles } from 'api/swagger/models'

export enum UserType {
  NKM = 'nkm',
  PARTNER = 'partner'
}

interface UserAccessListState {
  nkmUsers: UserAccess[]
  partnerUsers: UserAccess[]
  nkmPagination: Pagination
  partnerPagination: Pagination
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
  nkmPagination: {
    pageSize: 10
  },
  partnerPagination: {
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
    resetUsersAccessList: () => initialState,
    getNkmUsersRequest(state) {
      state.nkmLoading = true
    },
    getNkmUsersSuccess(
      state,
      action: PayloadAction<{ users: UserAccess[]; pagination: Pagination }>
    ) {
      state.nkmUsers = action.payload.users
      state.nkmPagination = action.payload.pagination
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
      action: PayloadAction<{ users: UserAccess[]; pagination: Pagination }>
    ) {
      state.partnerUsers = action.payload.users
      state.partnerPagination = action.payload.pagination
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

export const { clearUserAccessEditor, resetUsersAccessList } = userAccessListSlice.actions

export const userAccessListReducer = userAccessListSlice.reducer

export const getNkmUsers = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getNkmUsersRequest())
    const oldPagination = getState().userAccessList.nkmPagination
    const { result, ...pagination } = await api.auth.getNkmPartnerContactsInfo({
      pageSize: oldPagination.pageSize,
      page: oldPagination.page,
      ...params
    })
    dispatch(
      getNkmUsersSuccess({
        users: result as UserAccess[],
        pagination: {
          ...pagination,
          pageSize: params.pageSize ?? oldPagination.pageSize
        }
      })
    )
  } catch (err) {
    dispatch(getNkmUsersFail(err.toString()))
  }
}

export const getPartnerUsers = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getPartnerUsersRequest())
    const oldPagination = getState().userAccessList.partnerPagination
    const { result, ...pagination } = await api.auth.getPartnerContactsInfo({
      pageSize: oldPagination.pageSize,
      page: oldPagination.page,
      ...params
    })
    dispatch(
      getPartnerUsersSuccess({
        users: result as UserAccess[],
        pagination: {
          ...pagination,
          pageSize: params.pageSize ?? oldPagination.pageSize
        }
      })
    )
  } catch (err) {
    dispatch(getPartnerUsersFail(err.toString()))
  }
}

export const getUserAccess = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getUserRequest())
    const response = await api.auth.getPartnerContactInfo({ id })
    dispatch(getUserSuccess({ ...response } as UserAccess))
  } catch (err) {
    dispatch(getUserFail(err.toString()))
  }
}

export const saveUserAccess = (
  id: number,
  role: Roles,
  active: boolean,
  type?: UserType
): AppThunk => async dispatch => {
  try {
    dispatch(saveUserRequest())
    await api.auth.updatePartnerContactInfo({ id, partnerContactStateDto: { role, active } })
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
