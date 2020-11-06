import '@testing-library/jest-dom'
import { act, renderHook } from '@testing-library/react-hooks'
import { ColumnStorageName } from './ColumnStorageName'
import { useColumnOrderUtils } from './useColumnOrderUtils'
import { SelectValue } from 'antd/lib/select'
import { DropResult } from 'react-beautiful-dnd'

const defaultColumns = [
  {
    title: 'Column1',
    dataIndex: 'column1',
    cannotBeHidden: true
  },
  {
    title: 'Column2',
    dataIndex: 'column2'
  },
  {
    title: 'Column3',
    dataIndex: 'column3',
    hiddenByDefault: true
  }
]
const initialColumns = [defaultColumns[0], defaultColumns[1]]

const changedColumns = [defaultColumns[1], defaultColumns[0], defaultColumns[2]]

const columnsAfterApply = [defaultColumns[1], defaultColumns[0], defaultColumns[2]]

const dragObject: DropResult = {
  destination: { droppableId: 'droppable', index: 1 },
  draggableId: 'column1',
  mode: 'FLUID',
  reason: 'DROP',
  source: { index: 0, droppableId: 'droppable' },
  type: 'DEFAULT'
}

beforeAll(() => {
  jest.spyOn(Storage.prototype, 'setItem')
  jest.spyOn(Storage.prototype, 'getItem')
})

test('useColumnOrder custom hook tests', () => {
  const { result } = renderHook(() =>
    useColumnOrderUtils(defaultColumns, ColumnStorageName.PERMISSION)
  )

  expect(result.current.currentColumns).toStrictEqual(initialColumns)
  expect(localStorage.getItem).toHaveBeenCalledTimes(1)

  // show layout visible
  act(() => {
    result.current.handleChangeVisibility()
  })

  expect(result.current.visible).toBe(true)

  // hide second column
  act(() => {
    result.current.hideColumn(defaultColumns[1])
  })
  console.log(result.current)
  expect(result.current.hiddenColumns.length).toEqual(2)
  expect(result.current.tempColumns.length).toEqual(1)

  // add back second column
  act(() => {
    result.current.addColumn(result.current.hiddenColumns[0].dataIndex as SelectValue)
  })

  expect(result.current.hiddenColumns.length).toEqual(1)
  expect(result.current.tempColumns.length).toEqual(2)

  // try to hide first column
  act(() => {
    result.current.hideColumn(defaultColumns[0])
  })

  expect(result.current.hiddenColumns.length).toEqual(1)
  expect(result.current.tempColumns.length).toEqual(2)

  // remove all column
  act(() => {
    result.current.addOrRemoveAllColumn(false)
  })

  expect(result.current.hiddenColumns.length).toEqual(2)
  expect(result.current.tempColumns.length).toEqual(1)

  // add all column
  act(() => {
    result.current.addOrRemoveAllColumn(true)
  })

  expect(result.current.hiddenColumns.length).toEqual(0)
  expect(result.current.tempColumns.length).toEqual(3)

  // change first 2 column order
  act(() => {
    result.current.onDragEnd(dragObject)
  })

  expect(result.current.tempColumns).toStrictEqual(changedColumns)

  // save all changes
  act(() => {
    result.current.handleApplyChanges()
  })

  expect(result.current.currentColumns).toStrictEqual(columnsAfterApply)
  expect(localStorage.setItem).toHaveBeenCalledTimes(1)
})
