import React, { FC } from 'react'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useCampaignList } from './useCampaignList'

export const CampaignListTable: FC = () => {
  const { loading, coupons, handleTableChange, columnsConfig, paginationConfig } = useCampaignList()

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
