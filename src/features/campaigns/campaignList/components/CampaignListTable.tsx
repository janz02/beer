import React, { FC } from 'react'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { Coupon } from 'models/coupon'
import { ColumnType, TablePaginationConfig } from 'antd/lib/table'

export interface CampaignListTableProps {
  loading: boolean
  coupons?: Coupon[]
  handleTableChange: any
  columnsConfig: ColumnType<Coupon>[]
  paginationConfig: false | TablePaginationConfig
}

export const CampaignListTable: FC<CampaignListTableProps> = ({
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
