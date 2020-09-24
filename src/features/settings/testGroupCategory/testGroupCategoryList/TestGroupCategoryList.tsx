import React, { FC } from 'react'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { UseTestGroupCategoryListUtils } from './useTestGroupCategoryList'
import { GenericPopup } from 'components/popups/GenericPopup'

interface CategoryListProps {
  categoryListUtils: UseTestGroupCategoryListUtils
}

export const TestGroupCategoryList: FC<CategoryListProps> = props => {
  const { tableProps, popupProps } = props.categoryListUtils

  return (
    <>
      <ResponsiveTable hasHeaderOffset {...tableProps} />
      <GenericPopup {...popupProps} />
    </>
  )
}
