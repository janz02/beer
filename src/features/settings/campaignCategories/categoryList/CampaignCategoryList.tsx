import React, { FC } from 'react'
import './CampaignCategoryList.scss'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { UseCampaignCategoryListUtils } from './useCampaignCategoryList'

interface CampaignCategoryListProps {
  categoryListUtils: UseCampaignCategoryListUtils
}

export const CampaignCategoryList: FC<CampaignCategoryListProps> = props => {
  const { tableProps, popupProps } = props.categoryListUtils

  return (
    <>
      <ResponsiveTable className="category-list-table" hasHeaderOffset {...tableProps} />
      <GenericPopup {...popupProps} />
    </>
  )
}
