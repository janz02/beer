import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Product } from 'models/product'
import { history } from 'router/router'
import i18n from 'app/i18n'
import { message } from 'antd'
import { api } from 'api'
import { ProductModel } from 'api/swagger/campaign-editor/models'
import moment from 'moment'

interface ProductEditorState {
  product?: Product
  error: boolean
  loading: boolean
  loadingDelete: boolean
  loadingState: boolean
  loadingRegState: boolean
}

const initialState: ProductEditorState = {
  error: false,
  loading: false,
  loadingDelete: false,
  loadingState: false,
  loadingRegState: false
}

const productEditorSlice = createSlice({
  name: 'productEditor',
  initialState,
  reducers: {
    resetProductEditor: () => initialState,
    getProductRequest(state) {
      state.loading = true
    },
    getProductSuccess(state, action: PayloadAction<Product>) {
      state.product = action.payload
      state.loading = false
      state.error = false
    },
    getProductFail(state) {
      state.loading = false
      state.error = true
    },
    saveProductRequest(state) {
      state.loading = true
    },
    saveProductSuccess(state) {
      state.loading = false
      state.error = false
    },
    saveProductFail(state) {
      state.loading = false
      state.error = true
    },
    deleteProductRequest(state) {
      state.loadingDelete = true
    },
    deleteProductSuccess(state) {
      state.loadingDelete = false
    },
    deleteProductFail(state) {
      state.loadingDelete = true
    }
  }
})

const { getProductSuccess, getProductRequest, getProductFail } = productEditorSlice.actions
const { deleteProductRequest, deleteProductSuccess, deleteProductFail } = productEditorSlice.actions
const { saveProductSuccess, saveProductFail, saveProductRequest } = productEditorSlice.actions

export const { resetProductEditor } = productEditorSlice.actions

export const productEditorReducer = productEditorSlice.reducer

export const getProduct = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getProductRequest())
    const product = await api.products.getProduct({ id })
    dispatch(
      getProductSuccess({
        ...product,
        createdDate: product.createdDate ?? moment(product.createdDate),
        modifiedDate: product.modifiedDate ?? moment(product.modifiedDate)
      } as Product)
    )
  } catch (err) {
    dispatch(getProductFail())
  }
}

export const saveProduct = (data: Product): AppThunk => async (dispatch, getState) => {
  try {
    const product = getState().productEditor.product
    dispatch(saveProductRequest())

    if (product?.id) {
      await api.products.updateProduct({
        id: product.id,
        productModel: {
          ...product,
          ...data
        } as ProductModel
      })
      dispatch(getProduct(product.id))
    } else {
      const createdProductId = await api.products.createProduct({
        productModel: data as ProductModel
      })

      history.push(`/products/${createdProductId}`)
    }
    dispatch(saveProductSuccess())
    message.success(i18n.t('common.message.save-success'), 5)
  } catch (err) {
    dispatch(saveProductFail())
  }
}

export const deleteProduct = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(deleteProductRequest())
    await api.products.deleteProduct({ id })
    dispatch(deleteProductSuccess())
    message.success(i18n.t('common.message.delete-success'), 5)
    history.push(`/products`)
    return { id }
  } catch (err) {
    dispatch(deleteProductFail())
    return { id, error: true }
  }
}
