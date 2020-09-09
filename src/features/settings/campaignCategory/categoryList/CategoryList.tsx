import React, { FC } from 'react'
import './CategoryList.scss'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useCategoryList } from './useCategoryList'

interface CategoryListProps {
  onOpenEditor: (id?: number) => void
}

export const CategoryList: FC<CategoryListProps> = props => {
  const { onOpenEditor } = props
  const { tableProps, popupProps } = useCategoryList({ onOpenEditor })

  return (
    <>
      <ResponsiveTable className="category-list-table" hasHeaderOffset {...tableProps} />
      <GenericPopup {...popupProps} />
    </>
  )
}
