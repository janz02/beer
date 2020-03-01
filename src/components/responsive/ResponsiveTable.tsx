import React, { FC, useMemo } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table/Table'
import './ResponsiveTable.scss'
export interface ResponsiveTableProps {
  tableProps?: TableProps<any>
  hasHeaderOffset?: boolean
}

export const ResponsiveTable: FC<ResponsiveTableProps> = props => {
  const { tableProps, hasHeaderOffset } = props
  return (
    <Table
      {...tableProps}
      className={` responsive-table ${hasHeaderOffset ? 'has-header-offset' : ''}`}
    />
  )
}
