import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams,
  OrderByType,
  recalculatePaginationAfterDeletion
} from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'
import { TestGroupCategory } from 'models/testGroupCategory'
import moment from 'moment'

interface TestGroupCategoryListState {
  categories: TestGroupCategory[]
  listParams: ListRequestParams
  listState: FeatureState
  deleteState: FeatureState
}

const initialState: TestGroupCategoryListState = {
  categories: [],
  listParams: {
    pageSize: 10,
    orderBy: 'name',
    orderByType: OrderByType.Ascending
  },
  listState: FeatureState.Initial,
  deleteState: FeatureState.Initial
}

const testGroupCategoryListSlice = createSlice({
  name: 'testGroupCategoryList',
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
      action: PayloadAction<{ categories: TestGroupCategory[]; listParams: ListRequestParams }>
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
} = testGroupCategoryListSlice.actions

const getCategories = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const revisedParams = reviseListRequestParams(
      getState().testGroupCategoryList.listParams,
      params
    )

    const {
      items,
      ...pagination
    } = await api.campaignEditor.testGroupCategories.getTestGroupCategories(revisedParams)

    dispatch(
      getCategoriesSuccess({
        categories: items?.map(x => ({
          ...x,
          createdDate: moment(x.createdDate)
        })) as TestGroupCategory[],
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
    await api.campaignEditor.testGroupCategories.deleteTestGroupCategory({ id })
    dispatch(setDeleteState(FeatureState.Success))
    const newPage = recalculatePaginationAfterDeletion(getState().testGroupCategoryList.listParams)
    dispatch(getCategories({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(setDeleteState(FeatureState.Error))
    return { id, error: err.toString() }
  }
}

export const testGroupCategoryListActions = {
  resetCategoryList,
  getCategories,
  resetCategoryFilters,
  deleteCategory
}

export const testGroupCategoryListReducer = testGroupCategoryListSlice.reducer