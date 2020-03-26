import React, { FC } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table/Table'
import './ResponsiveTable.scss'
export interface ResponsiveTableProps extends TableProps<any> {
  hasHeaderOffset?: boolean
  hasFixedColumn?: boolean
}

export const ResponsiveTable: FC<ResponsiveTableProps> = props => {
  const { hasHeaderOffset, hasFixedColumn, ...tableProps } = props

  const className =
    `responsive-table ` +
    `${hasHeaderOffset ? 'has-header-offset ' : ''}` +
    `${hasFixedColumn ? 'has-fixed-column ' : ''}`

  return <Table size="small" {...tableProps} className={className} />
}
