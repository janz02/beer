import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Product } from 'models/product'
import { api } from 'api'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  storableListRequestParams,
  OrderByType
} from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'

interface CouponProductListState {
  products: Product[]
  listParams: ListRequestParams
  listState: FeatureState
  deleteState: FeatureState
}

const initialState: CouponProductListState = {
  products: [],
  listParams: {
    pageSize: 10,
    orderBy: 'name',
    orderByType: OrderByType.Ascending
  },
  listState: FeatureState.Initial,
  deleteState: FeatureState.Initial
}

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    resetProductList: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    setListState: (state, action: PayloadAction<FeatureState>) => {
      state.listState = action.payload
    },
    setDeleteState: (state, action: PayloadAction<FeatureState>) => {
      state.deleteState = action.payload
    },
    getProductsSuccess(
      state,
      action: PayloadAction<{ products: Product[]; listParams: ListRequestParams }>
    ) {
      state.products = action.payload.products
      state.listParams = action.payload.listParams
      state.listState = FeatureState.Success
    }
  }
})

const {
  resetListParams,
  setListState,
  setDeleteState,
  getProductsSuccess,
  resetProductList
} = productListSlice.actions

// TODO requestParams and response pagination needs to be handled
const getProducts = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const revisedParams = reviseListRequestParams(getState().productList.listParams, params)
    const { items } = await api.products.getProducts({})

    dispatch(
      getProductsSuccess({
        products: items as Product[],
        listParams: storableListRequestParams(revisedParams, {})
      })
    )
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const resetProductFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getProducts())
}

const deleteProduct = (id: number): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setDeleteState(FeatureState.Loading))
    await api.products.deleteProduct({ id })
    dispatch(setDeleteState(FeatureState.Success))
    const newPage = recalculatePaginationAfterDeletion(getState().productList.listParams)
    dispatch(getProducts({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(setDeleteState(FeatureState.Error))
    return { id, error: err.toString() }
  }
}

export const productListActions = {
  resetProductList,
  getProducts,
  resetProductFilters,
  deleteProduct
}

export const productListReducer = productListSlice.reducer
