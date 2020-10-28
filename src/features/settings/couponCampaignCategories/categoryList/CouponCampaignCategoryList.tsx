import React, { FC } from 'react'
import './CouponCampaignCategoryList.scss'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { CouponCampaignCategoryListUtils } from './useCouponCampaignCategoryListUtils'

interface CouponCampaignCategoryListProps {
  categoryListUtils: CouponCampaignCategoryListUtils
}

export const CouponCampaignCategoryList: FC<CouponCampaignCategoryListProps> = props => {
  const { tableProps, popupProps } = props.categoryListUtils

  return (
    <>
      <ResponsiveTable className="category-list-table" hasHeaderOffset {...tableProps} />
      <GenericPopup {...popupProps} />
    </>
  )
}
