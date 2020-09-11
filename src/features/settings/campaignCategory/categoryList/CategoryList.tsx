import React, { FC } from 'react'
import './CategoryList.scss'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { UseCategoryListUtils } from './useCategoryList'

interface CategoryListProps {
  categoryListUtils: UseCategoryListUtils
}

export const CategoryList: FC<CategoryListProps> = props => {
  const { tableProps, popupProps } = props.categoryListUtils

  return (
    <>
      <ResponsiveTable className="category-list-table" hasHeaderOffset {...tableProps} />
      <GenericPopup {...popupProps} />
    </>
  )
}
