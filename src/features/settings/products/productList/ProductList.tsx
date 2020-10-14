import React, { FC } from 'react'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { ProductListUtils } from './useProductListUtils'

interface ProductListProps {
  productListUtils: ProductListUtils
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
