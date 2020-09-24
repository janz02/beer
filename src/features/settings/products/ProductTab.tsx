import React, { useEffect } from 'react'
import { ProductList } from './productList/ProductList'
import { useDispatch } from 'hooks/react-redux-hooks'
import { productListActions } from './productList/productListSlice'
import { UseProductListUtils } from './productList/useProductList'
import { UseGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { ProductEditor } from './productEditor/ProductEditor'

export interface ProductTabProps {
  productListUtils: UseProductListUtils
  modalUtils: UseGenericModalFormEditorUtils
}

export const ProductTab: React.FC<ProductTabProps> = props => {
  const dispatch = useDispatch()
  const { editorParams, handleExit, handleAfterClose } = props.modalUtils
  useEffect(() => {
    dispatch(productListActions.getProducts())
  }, [dispatch])

  return (
    <>
      <ProductList productListUtils={props.productListUtils} />
      <ProductEditor params={editorParams} handleExit={handleExit} afterClose={handleAfterClose} />
    </>
  )
}
