import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Category } from 'models/category'
import { api } from 'api'
import { GetCategoryRequest } from 'api/swagger'
import { getCategories } from '../categoryList/categoryListSlice'

interface CouponCategoryEditorState {
  id?: number
  category?: Category | null
  loading: boolean
  error: string
}

const initialState: CouponCategoryEditorState = {
  loading: false,
  error: ''
}

const categoryEditorSlice = createSlice({
  name: 'categoryEditor',
  initialState,
  reducers: {
    getCategoryRequest(state) {
      state.loading = true
    },
    getCategorySuccess(state, action: PayloadAction<Category>) {
      state.category = action.payload
      state.loading = false
      state.error = ''
    },
    getCategoryFail(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    clearCategoryEditor(state) {
      state.category = null
      state.error = ''
      state.loading = false
    },
    saveCategoryRequest(state, action: PayloadAction<Category>) {
      state.category = action.payload
      state.loading = true
    },
    saveCategorySuccess(state, action: PayloadAction<Category>) {
      state.loading = false
      state.category = action.payload
      state.error = ''
    },
    saveCategoryFail(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  clearCategoryEditor,
  getCategoryRequest,
  getCategorySuccess,
  getCategoryFail,
  saveCategoryRequest,
  saveCategorySuccess,
  saveCategoryFail
} = categoryEditorSlice.actions

export default categoryEditorSlice.reducer

export const getCategory = (params: GetCategoryRequest): AppThunk => async dispatch => {
  dispatch(getCategoryRequest())
  try {
    const response = await api.categories.getCategory(params)
    dispatch(getCategorySuccess(response as Category))
  } catch (err) {
    dispatch(getCategoryFail(err.toString()))
  }
}

export const saveCategory = (category: Category): AppThunk => async dispatch => {
  dispatch(saveCategoryRequest(category))
  let id = category.id!
  try {
    if (category?.id && !isNaN(category?.id)) {
      await api.categories.updateCategory({
        id,
        categoryDto: {
          name: category.name
        }
      })
    } else {
      const response = await api.categories.createCategory({
        categoryDto: {
          name: category.name
        }
      })
      id = response.id!
    }
    dispatch(saveCategorySuccess({ ...category, id }))
    dispatch(getCategories())
    return true
  } catch (err) {
    dispatch(saveCategoryFail(err.toString()))
    return false
  }
}
