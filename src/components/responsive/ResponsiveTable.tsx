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

  const resolveRowClassName = (record: any, index: number): string => {
    console.log(record)
    return index % 2 === 0 ? 'table-even-row' : 'table-odd-row'
  }

  return (
    <Table size="small" {...tableProps} rowClassName={resolveRowClassName} className={className} />
  )
}
