import React, { FC } from 'react'
import './ProductList.scss'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { UseProductListUtils } from './useProductList'

interface ProductListProps {
  productListUtils: UseProductListUtils
}

export const ProductList: FC<ProductListProps> = props => {
  const { tableProps, popupProps } = props.productListUtils

  return (
    <>
      <ResponsiveTable className="product-list-table" hasHeaderOffset {...tableProps} />
      <GenericPopup {...popupProps} />
    </>
  )
}
