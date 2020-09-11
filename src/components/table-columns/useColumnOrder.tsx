import { useState, useEffect } from 'react'
import { ColumnType } from 'antd/lib/table'
import { DropResult } from 'react-beautiful-dnd'
import { ColumnStorageName } from './ColumnStorageName'

export interface UseColumnOrderFeatures<T> {
  visible: boolean
  currentColumns: ColumnType<T>[]
  tempColumns: ColumnType<T>[]
  handleChangeVisibility: () => void
  handleApplyChanges: () => void
  handleResetToDefault: () => void
  onDragEnd: (result: DropResult) => void
}

/**
 * Contains the logic for reordering, and saving columns order
 * tempColumns used while rearringing inside the drag-and-drop component
 * currentColumns are the actual columns for the Table
 * @param defaultColumns the default state, to reset to
 * @param storageName the name for the localStorage, to get and set the columns order
 */
export const useColumnOrder = <T extends {}>(
  defaultColumns: ColumnType<T>[],
  storageName: ColumnStorageName
): UseColumnOrderFeatures<T> => {
  const [visible, setVisible] = useState<boolean>(false)
  const [currentColumns, setCurrentColumns] = useState<ColumnType<T>[]>([...defaultColumns])
  const [tempColumns, setTempColumns] = useState<ColumnType<T>[]>([])

  /**
   * Toggles the visibility
   */
  const changeVisibility = (): void => setVisible(!visible)

  /**
   * Stores the dataIndex array to the localStorage
   */
  const storeColumnsOrder = (): void => {
    const dataIndexes: string[] = tempColumns
      .filter(column => column.dataIndex)
      .map(column => String(column.dataIndex))

    localStorage.setItem(storageName, JSON.stringify(dataIndexes))
  }

  /**
   * Reorders the columns based on the stored array order
   * @param dataIndexes array, which is the base for reordering
   */
  const reorderColumns = (dataIndexes: string[]): void => {
    setCurrentColumns(
      currentColumns.sort((column1, column2) => {
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

  /**
   * Gets the column order from the store
   */
  const reorderColumnsFromStore = (): void => {
    const dataIndexes: string | null = localStorage.getItem(storageName)
    if (dataIndexes) {
      reorderColumns(JSON.parse(dataIndexes))
    }
  }

  /**
   * After rearringing is done, set the currentColumns, and store the order in the store
   */
  const applyChanges = (): void => {
    setCurrentColumns(tempColumns)
    storeColumnsOrder()
    changeVisibility()
  }

  /**
   * After dragging is over, rearranges the tempColums, to match the dragged value
   * using react-beautiful-dnd for the event
   */
  const onDragEnd = (dropResult: DropResult): void => {
    if (!dropResult.destination) {
      return
    }

    const resultArray = Array.from(tempColumns)
    const [removed] = resultArray.splice(dropResult.source.index, 1)
    resultArray.splice(dropResult.destination.index, 0, removed)

    setTempColumns(resultArray)
  }

  const resetTempColumnsToDefault = (): void => {
    setTempColumns([...defaultColumns])
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
    currentColumns,
    tempColumns,
    handleChangeVisibility: changeVisibility,
    handleApplyChanges: applyChanges,
    handleResetToDefault: resetTempColumnsToDefault,
    onDragEnd
  }
}
