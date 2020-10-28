import React, { FC } from 'react'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { CouponCampaign } from 'models/couponCampaign'
import { ColumnType, TablePaginationConfig } from 'antd/lib/table'

export interface CouponCampaignListTableProps {
  loading: boolean
  coupons?: CouponCampaign[]
  handleTableChange: any
  columnsConfig: ColumnType<CouponCampaign>[]
  paginationConfig: false | TablePaginationConfig
}

export const CouponCampaignListTable: FC<CouponCampaignListTableProps> = ({
  loading,
  coupons,
  handleTableChange,
  columnsConfig,
  paginationConfig
}) => {
  return (
    <ResponsiveTable
      hasFixedColumn
      loading={loading}
      columns={columnsConfig}
      pagination={paginationConfig}
      dataSource={coupons}
      onChange={handleTableChange}
    />
  )
}
