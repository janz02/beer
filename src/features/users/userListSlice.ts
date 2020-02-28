import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { Pagination, calculatePagination, recalculatePagination } from 'models/pagination'
import { Site } from 'models/site'
import { ListRequestParams } from 'hooks/useTableUtils'
import { UserData } from 'models/user'

interface UserListState {
  users: UserData[]
  pagination: Pagination
  loading: boolean
  errorList: string
  errorDeletion: string
}

const initialState: UserListState = {
  users: [],
  pagination: {
    pageSize: 10
  },
  loading: false,
  errorList: '',
  errorDeletion: ''
}

const userListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {
    getUsersRequest(state) {
      state.loading = true
    },
    getUsersSuccess(state, action: PayloadAction<{ users: UserData[]; pagination: Pagination }>) {
      state.users = action.payload.users
      state.pagination = action.payload.pagination
      state.loading = false
      state.errorList = ''
    },
    getUsersFail(state, action: PayloadAction<string>) {
      state.loading = false
      state.errorList = action.payload
    }
  }
})

const { getUsersRequest, getUsersSuccess, getUsersFail } = userListSlice.actions

export const userListReducer = userListSlice.reducer

export const getUsers = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(getUsersRequest())
  try {
    const oldPagination = getState().userList.pagination
    const pagination = calculatePagination(params, oldPagination)
    const response = await api.sites.getSites({
      ...params,
      pageSize: pagination.pageSize,
      page: pagination.page
    })
    dispatch(
      getUsersSuccess({
        users: response.result as UserData[],
        pagination: {
          page: response.page,
          from: response.from,
          size: response.size,
          to: response.to,
          pageSize: pagination.pageSize
        }
      })
    )
  } catch (err) {
    dispatch(getUsersFail(err.toString()))
  }
}
