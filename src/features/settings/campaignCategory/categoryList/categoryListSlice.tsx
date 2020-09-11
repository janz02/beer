import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Category } from 'models/category'
import { couponApi } from 'api'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  storableListRequestParams,
  OrderByType
} from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'

interface CouponCategoryListState {
  categories: Category[]
  listParams: ListRequestParams
  listState: FeatureState
  deleteState: FeatureState
}

const initialState: CouponCategoryListState = {
  categories: [],
  listParams: {
    pageSize: 10,
    orderBy: 'name',
    orderByType: OrderByType.Ascending
  },
  listState: FeatureState.Initial,
  deleteState: FeatureState.Initial
}

const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState,
  reducers: {
    resetCategoryList: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    setListState: (state, action: PayloadAction<FeatureState>) => {
      state.listState = action.payload
    },
    setDeleteState: (state, action: PayloadAction<FeatureState>) => {
      state.deleteState = action.payload
    },
    getCategoriesSuccess(
      state,
      action: PayloadAction<{ categories: Category[]; listParams: ListRequestParams }>
    ) {
      state.categories = action.payload.categories
      state.listParams = action.payload.listParams
      state.listState = FeatureState.Success
    }
  }
})

const {
  resetListParams,
  setListState,
  setDeleteState,
  getCategoriesSuccess,
  resetCategoryList
} = categoryListSlice.actions

const getCategories = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const revisedParams = reviseListRequestParams(getState().categoryList.listParams, params)
    const { result, ...pagination } = await couponApi.categories.getCategories(revisedParams)

    dispatch(
      getCategoriesSuccess({
        categories: result as Category[],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const resetCategoryFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getCategories())
}

const deleteCategory = (id: number): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setDeleteState(FeatureState.Loading))
    await couponApi.categories.deleteCategory({ id })
    dispatch(setDeleteState(FeatureState.Success))
    const newPage = recalculatePaginationAfterDeletion(getState().categoryList.listParams)
    dispatch(getCategories({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(setDeleteState(FeatureState.Error))
    return { id, error: err.toString() }
  }
}

export const categoryListActions = {
  resetCategoryList,
  getCategories,
  resetCategoryFilters,
  deleteCategory
}

export const categoryListReducer = categoryListSlice.reducer
