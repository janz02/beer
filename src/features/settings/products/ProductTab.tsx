import React, { useEffect } from 'react'
import { ProductList } from './productList/ProductList'
import { useDispatch } from 'hooks/react-redux-hooks'
import { productListActions } from './productList/productListSlice'
import { UseProductListUtils } from './productList/useProductList'

export interface ProductTabProps {
  productListUtils: UseProductListUtils
}

export const ProductTab: React.FC<ProductTabProps> = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productListActions.getProducts())
  }, [dispatch])

  return (
    <>
      <ProductList productListUtils={props.productListUtils} />
    </>
  )
}
