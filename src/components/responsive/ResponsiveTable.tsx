import React, { FC } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table/Table'
import './ResponsiveTable.scss'
export interface ResponsiveTableProps extends TableProps<any> {
  hasHeaderOffset?: boolean
}

export const ResponsiveTable: FC<ResponsiveTableProps> = props => {
  const { hasHeaderOffset, ...tableProps } = props
  return (
    <Table
      {...tableProps}
      className={` responsive-table ${hasHeaderOffset ? 'has-header-offset' : ''}`}
    />
  )
}
