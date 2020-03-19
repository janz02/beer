import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Category } from 'models/category'
import { api } from 'api'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  Pagination
} from 'hooks/useTableUtils'

interface CouponCategoryListState {
  categories: Category[]
  pagination: ListRequestParams
  loading: boolean
  error: string
  errorDeletion: string
}

const initialState: CouponCategoryListState = {
  categories: [],
  pagination: {
    pageSize: 10
  },
  loading: false,
  error: '',
  errorDeletion: ''
}

const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState,
  reducers: {
    resetCategoryList: () => initialState,
    getCategoriesRequest(state) {
      state.loading = true
    },
    getCategoriesSuccess(
      state,
      action: PayloadAction<{ categories: Category[]; pagination: Pagination }>
    ) {
      state.categories = action.payload.categories
      state.pagination = action.payload.pagination
      state.loading = false
      state.error = ''
    },
    getCategoriesFail(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    deleteRequest(state) {
      state.loading = true
    },
    deleteSuccess(state) {
      state.loading = false
      state.errorDeletion = ''
    },
    deleteFail(state, action: PayloadAction<string>) {
      state.loading = false
      state.errorDeletion = action.payload
    }
  }
})

const {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFail,
  deleteRequest,
  deleteSuccess,
  deleteFail
} = categoryListSlice.actions

export const { resetCategoryList } = categoryListSlice.actions

export const categoryListReducer = categoryListSlice.reducer

export const getCategories = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(getCategoriesRequest())
  try {
    const oldPagination = getState().categoryList.pagination
    const { result, ...pagination } = await api.categories.getCategories({
      pageSize: oldPagination.pageSize,
      page: oldPagination.page,
      ...params
    })

    dispatch(
      getCategoriesSuccess({
        categories: result as Category[],
        pagination: {
          ...params,
          ...pagination,
          pageSize: params.pageSize ?? oldPagination.pageSize
        }
      })
    )
  } catch (err) {
    dispatch(getCategoriesFail(err.toString()))
  }
}

export const deleteCategory = (id: number): AppThunk => async (dispatch, getState) => {
  dispatch(deleteRequest())
  try {
    await api.categories.deleteCategory({ id })
    dispatch(deleteSuccess())
    const newPage = recalculatePaginationAfterDeletion(getState().categoryList.pagination)
    dispatch(getCategories({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(deleteFail(err.toString()))
    return { id, error: err.toString() }
  }
}
