import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { ListRequestParams, Pagination } from 'hooks/useTableUtils'
import { UserAccess, Role } from 'models/user'
import { message } from 'antd'
import i18n from 'app/i18n'

interface UserAccessListState {
  nkmUsers: UserAccess[]
  partnerUsers: UserAccess[]
  nkmPagination: Pagination
  partnerPagination: Pagination
  nkmLoading: boolean
  partnerLoading: boolean
  editorLoading: boolean
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
  editorLoading: false,
  errorList: '',
  errorDeletion: '',
  errorEditor: ''
}

const userAccessListSlice = createSlice({
  name: 'usersAccessList',
  initialState,
  reducers: {
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
      state.editorLoading = true
    },
    getUserSuccess(state, action: PayloadAction<UserAccess>) {
      state.editedUser = action.payload
      state.editorLoading = false
      state.errorDeletion = ''
    },
    getUserFail(state, action: PayloadAction<string>) {
      state.partnerLoading = false
      state.errorDeletion = action.payload
    },

    saveUserRequest(state) {
      state.editorLoading = true
    },
    saveUserSuccess(state) {
      state.editorLoading = false
      state.errorEditor = ''
    },
    saveUserFail(state, action: PayloadAction<string>) {
      state.partnerLoading = false
      state.errorEditor = action.payload
    },

    clearUserAccessEditor(state) {
      state.editedUser = undefined
      state.errorEditor = ''
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

export const { clearUserAccessEditor } = userAccessListSlice.actions

export const userAccessListReducer = userAccessListSlice.reducer

export const getNkmUsers = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getNkmUsersRequest())
    const oldPagination = getState().userAccessList.nkmPagination
    // TODO: integrate the good api
    const { result, ...pagination } = await api.sites.getSites({
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
    // TODO: integrate the good api
    const { result, ...pagination } = await api.sites.getSites({
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

export const getUserAccess = (id: number): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(getUserRequest())
    // TODO: integrate the good api
    // const response = await api.sites.getSite({ id })
    dispatch(
      getUserSuccess({
        id: id,
        name: 'kjkfsgj sdkjflksd' + Date.now(),
        role: Role.ADMINISTRATOR,
        active: !(id % 2)
      } as UserAccess)
    )
  } catch (err) {
    dispatch(getUserFail(err.toString()))
  }
}

export const saveUserAccess = (
  id: number,
  role: Role,
  active: boolean
): AppThunk => async dispatch => {
  try {
    dispatch(saveUserRequest())
    // TODO: integrate the good api
    // const response = await api.sites.getSite({ id })
    message.success(i18n.t('user-access.msg.change-succesful'))
    dispatch(saveUserSuccess())
  } catch (err) {
    dispatch(saveUserFail(err.toString()))
  }
}
