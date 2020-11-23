import React, { FC, useEffect, useMemo } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table/Table'
import './ResponsiveTable.scss'
import { useSelectableRowUtils } from 'hooks'

export interface ResponsiveTableProps extends TableProps<any> {
  columns: any[]
  hasHeaderOffset?: boolean
  hasFixedColumn?: boolean
  selectable?: boolean
  identificationKey?: string
  onSelectedChange?: (selected: any[]) => void
}

export const ResponsiveTable: FC<ResponsiveTableProps> = ({
  hasHeaderOffset,
  hasFixedColumn,
  selectable = true,
  onSelectedChange = () => ({}),
  columns,
  dataSource,
  ...tableProps
}) => {
  const className =
    `responsive-table ` +
    `${hasHeaderOffset ? 'has-header-offset ' : ''}` +
    `${hasFixedColumn ? 'has-fixed-column ' : ''}`

  const { selectColumnConfig, setCurrentPageIds, selectedItems } = useSelectableRowUtils()

  useEffect(() => {
    setCurrentPageIds(dataSource?.map(el => el.id) || [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource])

  useEffect(() => {
    onSelectedChange(selectedItems)
  }, [selectedItems, onSelectedChange])

  const columnsOverride = useMemo(() => {
    if (dataSource && dataSource.length && selectable) {
      return [selectColumnConfig, ...columns]
    } else {
      return columns
    }
  }, [dataSource, columns, selectable, selectColumnConfig])

  const tablePropsOverride = {
    ...tableProps,
    dataSource,
    columns: columnsOverride
  }

  return <Table size="small" {...tablePropsOverride} className={className} />
}
