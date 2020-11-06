import { useState, useEffect, useMemo, useCallback } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { ColumnStorageName } from './ColumnStorageName'
import { SelectValue } from 'antd/lib/select'
import { ExtendedColumnType } from './ExtendedColumnType'

export interface ColumnOrderUtils<T> {
  visible: boolean
  currentColumns: ExtendedColumnType<T>[]
  tempColumns: ExtendedColumnType<T>[]
  hiddenColumns: ExtendedColumnType<T>[]
  handleChangeVisibility: () => void
  handleApplyChanges: () => void
  handleResetToDefault: () => void
  addColumn: (value: SelectValue) => void
  addOrRemoveAllColumn: (value: boolean) => void
  hideColumn: (column: ExtendedColumnType<T>) => void
  onDragEnd: (result: DropResult) => void
}

/**
 * Contains the logic for reordering, and saving columns order
 * Pass this hook as a prop to the ColumnOrderDropdown component
 * tempColumns used while rearranging inside the drag-and-drop component
 * shownColumns gets tempColumns value after applying changes
 * hiddenColumns used in the Select component
 * currentColumns used in the Table, sorting defaultColumns by shownColumns
 * @param defaultColumns the default state of the columns, used for reset and initial values
 * @param storageName the name for the localStorage, to get and set the columns order
 */
export const useColumnOrderUtils = <T extends {}>(
  defaultColumns: ExtendedColumnType<T>[],
  storageName: ColumnStorageName
): ColumnOrderUtils<T> => {
  const [visible, setVisible] = useState<boolean>(false)
  const [tempColumns, setTempColumns] = useState<ExtendedColumnType<T>[]>([])
  const [shownColumns, setShownColumns] = useState<ExtendedColumnType<T>[]>([])
  const [hiddenColumns, setHiddenColumns] = useState<ExtendedColumnType<T>[]>([])

  const changeVisibility = (): void => setVisible(!visible)

  const getCurrentColumnsConfig = useCallback(
    (dataIndexes: string[]): ExtendedColumnType<T>[] => {
      return defaultColumns
        .filter(column => !column.dataIndex || dataIndexes.includes(String(column.dataIndex)))
        .sort((column1, column2) => {
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
    },
    [defaultColumns]
  )

  const reorderColumns = (dataIndexes: string[]): void => {
    setHiddenColumns(
      defaultColumns.filter(
        column => column.dataIndex && !dataIndexes.includes(String(column.dataIndex))
      )
    )
    setShownColumns(getCurrentColumnsConfig(dataIndexes))
  }

  const reorderColumnsFromStore = (): void => {
    const storedDataIndexes: string | null = localStorage.getItem(storageName)
    if (storedDataIndexes) {
      reorderColumns(JSON.parse(storedDataIndexes))
    } else {
      setShownColumns(defaultColumns.filter(x => !x.hiddenByDefault))
      setHiddenColumns(defaultColumns.filter(x => x.hiddenByDefault))
    }
  }

  const storeColumnsOrder = (): void => {
    const dataIndexes: string[] = tempColumns
      .filter(column => column.dataIndex)
      .map(column => String(column.dataIndex))

    localStorage.setItem(storageName, JSON.stringify(dataIndexes))
  }

  const applyChanges = (): void => {
    setShownColumns([...tempColumns, ...defaultColumns.filter(column => !column.dataIndex)])
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
    ] as ExtendedColumnType<T>[])
  }

  const addOrRemoveAllColumn = (value: boolean): void => {
    if (value) {
      setTempColumns([...tempColumns, ...hiddenColumns])
      setHiddenColumns([])
    } else {
      setTempColumns(defaultColumns.filter(column => column.cannotBeHidden))
      setHiddenColumns(defaultColumns.filter(column => column.dataIndex && !column.cannotBeHidden))
    }
  }

  const hideColumn = (column: ExtendedColumnType<T>): void => {
    if (!column.cannotBeHidden) {
      setHiddenColumns([...hiddenColumns, column])
      setTempColumns(tempColumns.filter(tempColumn => tempColumn !== column))
    }
  }

  const resetToDefault = (): void => {
    setTempColumns(defaultColumns.filter(column => column.dataIndex && !column.hiddenByDefault))
    setHiddenColumns(defaultColumns.filter(column => column.hiddenByDefault))
  }

  useEffect(() => {
    reorderColumnsFromStore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTempColumns(shownColumns.filter(column => column.dataIndex && !column.hiddenByDefault))
  }, [shownColumns])

  const currentColumns = useMemo((): ExtendedColumnType<T>[] => {
    const dataIndexes: string[] = shownColumns.map(column => String(column.dataIndex))
    return getCurrentColumnsConfig(dataIndexes)
  }, [getCurrentColumnsConfig, shownColumns])

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
