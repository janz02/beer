import React, { FC } from 'react'
import './SegmentationCategoryList.scss'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { SegmentationCategoryListUtils } from './useSegmentationCategoryListUtils'

interface SegmentationCategoryListProps {
  categoryListUtils: SegmentationCategoryListUtils
}

export const SegmentationCategoryList: FC<SegmentationCategoryListProps> = props => {
  const { tableProps, popupProps } = props.categoryListUtils

  return (
    <>
      <ResponsiveTable className="category-list-table" hasHeaderOffset {...tableProps} />
      <GenericPopup {...popupProps} />
    </>
  )
}
