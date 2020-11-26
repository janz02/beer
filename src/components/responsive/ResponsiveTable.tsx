import React, { FC, useEffect, useMemo } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table/Table'
import './ResponsiveTable.scss'
import { useSelectableRowUtils } from 'hooks'

export interface ResponsiveTableProps extends TableProps<any> {
  hasHeaderOffset?: boolean
  hasFixedColumn?: boolean
  selectable?: boolean
  isBackendPagination?: boolean
  onSelectedChange?: (selected: any[]) => void
}

export const ResponsiveTable: FC<ResponsiveTableProps> = ({
  hasHeaderOffset,
  hasFixedColumn,
  selectable = true,
  isBackendPagination = true,
  onSelectedChange = () => ({}),
  columns,
  dataSource,
  onChange,
  pagination,
  ...tableProps
}) => {
  const className =
    `responsive-table ` +
    `${hasHeaderOffset ? 'has-header-offset ' : ''}` +
    `${hasFixedColumn ? 'has-fixed-column ' : ''}`

  const { selectColumnConfig, setCurrentPageIds, selectedItems } = useSelectableRowUtils({
    isBackendPagination
  })

  useEffect(() => {
    setCurrentPageIds(dataSource || [], (pagination as any)?.current, (pagination as any)?.pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource])

  useEffect(() => {
    onSelectedChange(selectedItems)
  }, [selectedItems, onSelectedChange])

  const extendedColumns = useMemo(() => {
    if (dataSource && dataSource.length && selectable) {
      return [selectColumnConfig, ...(columns || [])]
    } else {
      return columns
    }
  }, [dataSource, columns, selectable, selectColumnConfig])

  const extendedTableProps = {
    ...tableProps,
    dataSource,
    columns: extendedColumns,
    pagination,
    onChange: (paginationChange: any, filters: any, sorter: any, extra: any) => {
      setCurrentPageIds(dataSource || [], paginationChange.current, paginationChange.pageSize)
      onChange?.(paginationChange, filters, sorter, extra)
    }
  }

  return <Table size="small" {...extendedTableProps} className={className} />
}
