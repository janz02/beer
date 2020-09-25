import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { CampaignCategory } from 'models/campaignCategory'
import { api } from 'api'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  OrderByType,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'
import moment from 'moment'

interface SegmentationCategoryListState {
  categories: CampaignCategory[]
  listParams: ListRequestParams
  listState: FeatureState
  deleteState: FeatureState
}

const initialState: SegmentationCategoryListState = {
  categories: [],
  listParams: {
    page: 1,
    pageSize: 10,
    orderBy: 'name',
    orderByType: OrderByType.Ascending
  },
  listState: FeatureState.Initial,
  deleteState: FeatureState.Initial
}

const segmentationCategoryListSlice = createSlice({
  name: 'segmentationCategoryList',
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
} = segmentationCategoryListSlice.actions

const getCategories = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const revisedParams = reviseListRequestParams(
      getState().segmentationCategoryList.listParams,
      params
    )

    let orderBy
    if (revisedParams.orderBy) {
      const type = revisedParams.orderByType !== OrderByType.Descending ? 'asc' : 'desc'
      orderBy = revisedParams.orderBy + '_' + type
    }

    const {
      items,
      ...pagination
    } = await api.campaignEditor.segmentationCategories.getSegmentationCategories({
      ...revisedParams,
      orderBy
    })

    dispatch(
      getCategoriesSuccess({
        categories: items?.map(x => ({
          ...x,
          createdDate: moment(x.createdDate)
        })) as CampaignCategory[],
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
    await api.campaignEditor.segmentationCategories.deleteSegmentationCategory({ id })
    dispatch(setDeleteState(FeatureState.Success))
    const newPage = recalculatePaginationAfterDeletion(
      getState().segmentationCategoryList.listParams
    )
    dispatch(getCategories({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(setDeleteState(FeatureState.Error))
    return { id, error: err.toString() }
  }
}

export const segmentationCategoryListActions = {
  resetCategoryList,
  getCategories,
  resetCategoryFilters,
  deleteCategory
}

export const segmentationCategoryListReducer = segmentationCategoryListSlice.reducer
