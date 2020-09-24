import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { CampaignCategory } from 'models/campaignCategory'
import { api } from 'api'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  storableListRequestParams,
  OrderByType
} from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'

interface CouponCategoryListState {
  categories: CampaignCategory[]
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

const campaignCategoryListSlice = createSlice({
  name: 'campaignCategoryList',
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
      action: PayloadAction<{ categories: CampaignCategory[]; listParams: ListRequestParams }>
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
} = campaignCategoryListSlice.actions

const getCategories = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const revisedParams = reviseListRequestParams(
      getState().campaignCategoryList.listParams,
      params
    )
    const { result, ...pagination } = await api.coupon.categories.getCategories(revisedParams)

    dispatch(
      getCategoriesSuccess({
        categories: result as CampaignCategory[],
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
    await api.coupon.categories.deleteCategory({ id })
    dispatch(setDeleteState(FeatureState.Success))
    const newPage = recalculatePaginationAfterDeletion(getState().campaignCategoryList.listParams)
    dispatch(getCategories({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(setDeleteState(FeatureState.Error))
    return { id, error: err.toString() }
  }
}

export const campaignCategoryListActions = {
  resetCategoryList,
  getCategories,
  resetCategoryFilters,
  deleteCategory
}

export const campaignCategoryListReducer = campaignCategoryListSlice.reducer
