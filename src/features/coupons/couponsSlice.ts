import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { Category } from 'models/category'

interface CouponsState {
  categories?: Category[]
  error: string | null
  loading: boolean
}

const initialState: CouponsState = {
  error: null,
  loading: false
}

const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    getCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload

      state.loading = false
      state.error = null
    },
    setLoadingStart(state) {
      state.loading = true
    },
    setLoadingFailed(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { getCategoriesSuccess, setLoadingStart, setLoadingFailed } = couponsSlice.actions

export const couponsReducer = couponsSlice.reducer

export const getCategories = (): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    // TODO: categories pageSize is hardcoded, consider to do a better form field with lazy loading and search
    const categories = await api.categories.getCategories({ pageSize: 10000, orderBy: 'name' })
    dispatch(
      getCategoriesSuccess(categories.result!.map(x => ({ id: x.id, name: x.name } as Category)))
    )
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}
