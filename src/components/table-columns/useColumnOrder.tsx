import { useState, useEffect } from 'react'
import { ColumnType } from 'antd/lib/table'

export interface UseColumnOrderFeatures<T> {
  visible: boolean
  changeVisibility: () => void
  defaultColumns: ColumnType<T>[]
  currentColumns: ColumnType<T>[]
  setCurrentColumns: Function
  tempColumns: ColumnType<T>[]
  setTempColumns: Function
  storeColumnsOrder: () => void
}

export const useColumnOrder = <T extends {}>(
  defaultColumns: ColumnType<T>[],
  storageName: string
): UseColumnOrderFeatures<T> => {
  const [visible, setVisible] = useState<boolean>(false)
  const [currentColumns, setCurrentColumns] = useState<ColumnType<T>[]>([])
  const [tempColumns, setTempColumns] = useState<ColumnType<T>[]>([])

  const changeVisibility = (): void => setVisible(!visible)

  const storeColumnsOrder = (): void => {
    const dataIndexes: string[] = tempColumns
      .filter(column => column.dataIndex)
      .map(column => String(column.dataIndex))

    localStorage.setItem(storageName, JSON.stringify(dataIndexes))
  }

  const reorderColumns = (dataIndexes: string[]): void => {
    setCurrentColumns(
      defaultColumns.sort((column1, column2) => {
        if (!column1.dataIndex) {
          return 1
        }
        if (!column2.dataIndex) {
          return -1
        }
        return (
          dataIndexes.indexOf(String(column1.dataIndex)) -
          dataIndexes.indexOf(String(column2.dataIndex))
        )
      })
    )
  }

  const reorderColumnsFromStore = (): void => {
    const dataIndexes: string | null = localStorage.getItem(storageName)
    if (dataIndexes) {
      reorderColumns(JSON.parse(dataIndexes))
    } else {
      setCurrentColumns(defaultColumns)
    }
  }

  useEffect(() => {
    reorderColumnsFromStore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTempColumns(currentColumns)
  }, [currentColumns])

  return {
    visible,
    changeVisibility,
    defaultColumns,
    currentColumns,
    setCurrentColumns,
    tempColumns,
    setTempColumns,
    storeColumnsOrder
  }
}
