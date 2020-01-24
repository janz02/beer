import React, { FC } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table/Table'
import './ResponsiveTable.scss'
export interface ResponsiveTableProps {
  tableProps?: TableProps<any>
  error?: string
  className?: string
  headerTitle?: string
  headerOptions?: () => JSX.Element
}

export const ResponsiveTable: FC<ResponsiveTableProps> = props => {
  const { tableProps, error, className, headerOptions, headerTitle } = props

  const header = (): JSX.Element => (
    <div className="responsive-table__header">
      {headerTitle && <h3>{headerTitle}</h3>}
      {headerOptions && <div> {headerOptions()}</div>}
    </div>
  )
  const errorMsg = (): JSX.Element => <div className="responsive-table__error">{error}</div>

  return (
    <Table
      {...tableProps}
      className={`responsive-table ${className ?? ''}`}
      title={header}
      footer={error ? errorMsg : undefined}
    />
  )
}
