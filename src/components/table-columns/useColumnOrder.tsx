import { useState, useEffect } from 'react'
import { ColumnType } from 'antd/lib/table'
import { DropResult } from 'react-beautiful-dnd'
import { ColumnStorageName } from './ColumnStorageName'
import { SelectValue } from 'antd/lib/select'

export interface UseColumnOrderFeatures<T> {
  visible: boolean
  currentColumns: ColumnType<T>[]
  tempColumns: ColumnType<T>[]
  hiddenColumns: ColumnType<T>[]
  handleChangeVisibility: () => void
  handleApplyChanges: () => void
  handleResetToDefault: () => void
  addColumn: (value: SelectValue) => void
  addOrRemoveAllColumn: (value: boolean) => void
  hideColumn: (column: ColumnType<T>) => void
  onDragEnd: (result: DropResult) => void
}

/**
 * Contains the logic for reordering, and saving columns order
 * Pass this hook as a prop to the ColumnOrderDropdown component
 * tempColumns used while rearranging inside the drag-and-drop component
 * hiddenColumns used in the Select component
 * currentColumns are the actual columns for the Table
 * @param defaultColumns the default state of the columns, used for reset and initial values
 * @param storageName the name for the localStorage, to get and set the columns order
 */
export const useColumnOrder = <T extends {}>(
  defaultColumns: ColumnType<T>[],
  storageName: ColumnStorageName
): UseColumnOrderFeatures<T> => {
  const [visible, setVisible] = useState<boolean>(false)
  const [currentColumns, setCurrentColumns] = useState<ColumnType<T>[]>([])
  const [tempColumns, setTempColumns] = useState<ColumnType<T>[]>([])
  const [hiddenColumns, setHiddenColumns] = useState<ColumnType<T>[]>([])

  const changeVisibility = (): void => setVisible(!visible)

  const partition = (array: any[], conditionFn: (column: any) => boolean): any[][] =>
    array.reduce(
      (result: any[], element: any) => {
        result[conditionFn(element) ? 0 : 1].push(element)
        return result
      },
      [[], []]
    )

  const reorderColumns = (storedDataIndexes: string[]): void => {
    const [shownColumns, notShownColumns] = partition(
      defaultColumns,
      column => !column.dataIndex || storedDataIndexes.includes(column.dataIndex)
    )

    setHiddenColumns(notShownColumns)

    setCurrentColumns(
      shownColumns.sort((column1, column2) => {
        if (!column1.dataIndex) {
          return 1
        }
        if (!column2.dataIndex) {
          return -1
        }
        return (
          storedDataIndexes.indexOf(String(column1.dataIndex)) -
          storedDataIndexes.indexOf(String(column2.dataIndex))
        )
      })
    )
  }

  const reorderColumnsFromStore = (): void => {
    const storedDataIndexes: string | null = localStorage.getItem(storageName)
    if (storedDataIndexes) {
      reorderColumns(JSON.parse(storedDataIndexes))
    } else {
      setCurrentColumns([...defaultColumns])
    }
  }

  const storeColumnsOrder = (): void => {
    const dataIndexes: string[] = tempColumns
      .filter(column => column.dataIndex)
      .map(column => String(column.dataIndex))

    localStorage.setItem(storageName, JSON.stringify(dataIndexes))
  }

  const applyChanges = (): void => {
    setCurrentColumns([...tempColumns, ...defaultColumns.filter(column => !column.dataIndex)])
    storeColumnsOrder()
    changeVisibility()
  }

  const onDragEnd = (dropResult: DropResult): void => {
    if (!dropResult.destination) {
      return
    }

    const resultArray = Array.from(tempColumns)
    const [removed] = resultArray.splice(dropResult.source.index, 1)
    resultArray.splice(dropResult.destination.index, 0, removed)

    setTempColumns(resultArray)
  }

  const addColumn = (value: SelectValue): void => {
    setHiddenColumns(hiddenColumns.filter(hiddenColumn => hiddenColumn.dataIndex !== value))
    setTempColumns([
      ...tempColumns,
      ...defaultColumns.filter(column => String(column.dataIndex) === value.toString())
    ] as ColumnType<T>[])
  }

  const addOrRemoveAllColumn = (value: boolean): void => {
    if (value) {
      setTempColumns([...tempColumns, ...hiddenColumns])
      setHiddenColumns([])
    } else {
      setTempColumns([])
      setHiddenColumns(defaultColumns.filter(column => column.dataIndex))
    }
  }

  const hideColumn = (column: ColumnType<T>): void => {
    setHiddenColumns([...hiddenColumns, column])
    setTempColumns(tempColumns.filter(tempColumn => tempColumn !== column))
  }

  const resetToDefault = (): void => {
    setTempColumns(defaultColumns.filter(column => column.dataIndex))
    setHiddenColumns([])
  }

  useEffect(() => {
    reorderColumnsFromStore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTempColumns(currentColumns.filter(column => column.dataIndex))
  }, [currentColumns])

  return {
    visible,
    currentColumns,
    tempColumns,
    hiddenColumns,
    handleChangeVisibility: changeVisibility,
    handleApplyChanges: applyChanges,
    handleResetToDefault: resetToDefault,
    addColumn,
    addOrRemoveAllColumn,
    hideColumn,
    onDragEnd
  }
}
