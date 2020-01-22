import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Category } from 'models/category'
import { api } from 'api'
import { ListCategoriesRequest } from 'api/swagger'

interface Pagination {
  page?: number
  from?: number
  to?: number
  size?: number
  pageSize?: number
}

interface CouponCategoryListState {
  categories: Category[]
  pagination?: Pagination
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

const couponCategoryListSlice = createSlice({
  name: '@category-list',
  initialState,
  reducers: {
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

export const {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFail,
  deleteRequest,
  deleteSuccess,
  deleteFail
} = couponCategoryListSlice.actions

export default couponCategoryListSlice.reducer

export const getCategories = (params: ListCategoriesRequest = {}): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(getCategoriesRequest())
  try {
    const oldPagination = getState().categoryList.pagination
    const pageSize = params.pageSize ?? oldPagination?.pageSize ?? 10
    const page = params.page ?? oldPagination?.page ?? 1

    const response = await api.categories.listCategories({
      pageSize,
      page: Math.max(page, 1)
    })

    dispatch(
      getCategoriesSuccess({
        categories: response.result as Category[],
        pagination: {
          page: response.page,
          from: response.from,
          size: response.size,
          to: response.to,
          pageSize
        }
      })
    )
  } catch (err) {
    dispatch(getCategoriesFail(err.toString()))
  }
}

export const deleteCategory = (id: number, refreshList = true): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(deleteRequest())
  try {
    await api.categories.deleteCategories({ id })
    if (refreshList) {
      const oldPagination = getState().categoryList.pagination
      const reductPage = oldPagination?.to === oldPagination?.from
      const page = oldPagination?.page! - +reductPage
      dispatch(getCategories({ page }))
    }
    dispatch(deleteSuccess())
    return true
  } catch (err) {
    dispatch(deleteFail(err.toString()))
    return false
  }
}
