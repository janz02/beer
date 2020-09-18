import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Product } from 'models/product'
import { api } from 'api'
import { GetProductRequest } from 'api/swagger/campaign-editor/apis/ProductsApi'
import { productListActions } from '../productList/productListSlice'
import { message } from 'antd'
import i18n from 'app/i18n'
import { FeatureState } from 'models/featureState'

interface CouponProductEditorState {
  id?: number
  product?: Product | null
  editorState: FeatureState
}

const initialState: CouponProductEditorState = {
  editorState: FeatureState.Initial
}

const productEditorSlice = createSlice({
  name: 'productEditor',
  initialState,
  reducers: {
    resetProductEditor: () => initialState,
    setEditorState: (state, action: PayloadAction<FeatureState>) => {
      state.editorState = action.payload
    },
    getProductSuccess(state, action: PayloadAction<Product>) {
      state.product = action.payload
      state.editorState = FeatureState.Success
    },
    saveProductSuccess(state, action: PayloadAction<Product>) {
      message.success(i18n.t('common.message.save-success'), 5)
      state.product = action.payload
      state.editorState = FeatureState.Success
    }
  }
})

const { setEditorState, getProductSuccess, saveProductSuccess } = productEditorSlice.actions

const { resetProductEditor } = productEditorSlice.actions

const getProduct = (params: GetProductRequest): AppThunk => async dispatch => {
  dispatch(setEditorState(FeatureState.Loading))
  try {
    const response = await api.products.getProduct(params)
    dispatch(getProductSuccess(response as Product))
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
  }
}

const saveProduct = (product: Product): AppThunk => async dispatch => {
  dispatch(setEditorState(FeatureState.Loading))

  let id = product?.id
  try {
    if (id && !isNaN(id)) {
      await api.products.updateProduct({
        id,
        productModel: {
          id,
          name: product.name
        }
      })
    } else {
      const createdProductId: number = await api.products.createProduct({
        productModel: {
          name: product.name
        }
      })
      id = createdProductId
    }
    dispatch(saveProductSuccess({ ...product, id }))
    dispatch(productListActions.getProducts())
    return true
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
    return false
  }
}

export const productEditorActions = {
  resetProductEditor,
  getProduct,
  saveProduct
}

export const productEditorReducer = productEditorSlice.reducer
