import '@testing-library/jest-dom'
import React, { FC, useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from 'app/i18n'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'

const exampleList = [
  { id: 1, name: 'Some name 1' },
  { id: 2, name: 'Some name 2' },
  { id: 3, name: 'Some name 3' },
  { id: 4, name: 'Some name 4' },
  { id: 5, name: 'Some name 5' },
  { id: 6, name: 'Some name 6' },
  { id: 7, name: 'Some name 7' },
  { id: 8, name: 'Some name 8' },
  { id: 9, name: 'Some name 9' },
  { id: 10, name: 'Some name 10' }
]

const NonSelectableTableExample: FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ResponsiveTable
        loading={false}
        columns={[
          {
            title: 'Id',
            key: 'id',
            dataIndex: 'id'
          },
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name'
          }
        ]}
        dataSource={exampleList}
        pagination={{
          pageSize: 5
        }}
        scroll={{ x: true }}
        selectable={false}
        isBackendPagination={false}
      />
    </I18nextProvider>
  )
}

const TableExample: FC = () => {
  const [selected, setSelected] = useState<any[]>()

  return (
    <I18nextProvider i18n={i18n}>
      <ResponsiveTable
        loading={false}
        columns={[
          {
            title: 'Id',
            key: 'id',
            dataIndex: 'id'
          },
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name'
          }
        ]}
        dataSource={exampleList}
        pagination={{
          pageSize: 5
        }}
        scroll={{ x: true }}
        onSelectedChange={selectedItems => setSelected(selectedItems)}
        isBackendPagination={false}
      />
      <ul>
        {selected?.map(id => (
          <li data-testid="selectedListElement" value={`${id}`}>
            {id}
          </li>
        ))}
      </ul>
    </I18nextProvider>
  )
}

test('selectable row utils: renders non-selectable table without selection column', () => {
  // Act
  render(<NonSelectableTableExample />)

  // Assert
  expect(screen.queryByTestId('tableSelect_HeaderCheckbox')).not.toBeInTheDocument()
})

test('selectable row utils: renders table with selection column', () => {
  // Act
  render(<TableExample />)

  // Assert
  expect(screen.getByTestId('tableSelect_HeaderCheckbox')).toBeInTheDocument()
  expect(screen.getByTestId('tableSelect_HeaderDropdown')).toBeInTheDocument()
  expect(screen.getByTestId('tableSelect_rowcheckbox_1')).toBeInTheDocument()
})

test('selectable row utils: selection fires onSelectChange event', () => {
  // Arrange
  render(<TableExample />)

  // Act
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_1'))

  // Assert
  expect(screen.getAllByTestId('selectedListElement')).toHaveLength(1)
})

test('selectable row utils: selected item id is in the selected elements', () => {
  // Arrange
  render(<TableExample />)

  // Act
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_1'))

  // Assert
  expect(screen.getAllByTestId('selectedListElement')[0]).toHaveValue(1)
})

test('selectable row utils: selected item id from page 1 is in the selected elements when page 2 is active', () => {
  // Arrange
  const { container } = render(<TableExample />)
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_1'))
  const nextPageBtn = container.querySelector('.ant-pagination-next')?.firstChild

  // Act
  fireEvent.click(nextPageBtn as HTMLButtonElement)

  // Assert
  expect(screen.getByTestId('tableSelect_rowcheckbox_6')).toBeInTheDocument()
  expect(screen.getAllByTestId('selectedListElement')).toHaveLength(1)
  expect(screen.getAllByTestId('selectedListElement')[0]).toHaveValue(1)
})

test('selectable row utils: header checkbox for current page is unchecked', () => {
  // Arrange
  render(<TableExample />)

  // Act
  const headerCheckbox = screen.getByTestId('tableSelect_HeaderCheckbox') as HTMLInputElement

  // Assert
  expect(headerCheckbox.checked).toBe(false)
})

test('selectable row utils: header checkbox is in minus state if not all current page items are selected', () => {
  // Arrange
  const { container } = render(<TableExample />)
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_1'))

  // Act
  const headerCheckbox = screen.getByTestId('tableSelect_HeaderCheckbox') as HTMLInputElement

  // Assert
  expect(headerCheckbox.checked).toBe(true)
  expect(container.querySelector('.table-select__checkbox')?.className).toContain(
    'table-select__checkbox--minus'
  )
})

test('selectable row utils: header checkbox is in all state if all current page items are selected', () => {
  // Arrange
  const { container } = render(<TableExample />)
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_1'))
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_2'))
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_3'))
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_4'))
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_5'))

  // Act
  const headerCheckbox = screen.getByTestId('tableSelect_HeaderCheckbox') as HTMLInputElement

  // Assert
  expect(headerCheckbox.checked).toBe(true)
  expect(container.querySelector('.table-select__checkbox')?.className).not.toContain(
    'table-select__checkbox--minus'
  )
})

test('selectable row utils: header checkbox can remove all selected items from current page when all is selected', () => {
  // Arrange
  render(<TableExample />)
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_1'))
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_2'))
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_3'))
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_4'))
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_5'))
  const headerCheckbox = screen.getByTestId('tableSelect_HeaderCheckbox') as HTMLInputElement

  // Act
  fireEvent.click(headerCheckbox)

  // Assert
  expect(headerCheckbox.checked).toBe(false)
  expect(screen.queryAllByTestId('selectedListElement')).toHaveLength(0)
})

test('selectable row utils: header checkbox can remove all selected items from current page when NOT all is selected', () => {
  // Arrange
  render(<TableExample />)
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_1'))
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_2'))
  const headerCheckbox = screen.getByTestId('tableSelect_HeaderCheckbox') as HTMLInputElement

  // Act
  fireEvent.click(headerCheckbox)

  // Assert
  expect(headerCheckbox.checked).toBe(false)
  expect(screen.queryAllByTestId('selectedListElement')).toHaveLength(0)
})

test('selectable row utils: header checkbox can remove all selected items from current page but keep other page selections', () => {
  // Arrange
  const { container } = render(<TableExample />)

  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_1'))

  const nextPageBtn = container.querySelector('.ant-pagination-next')?.firstChild
  fireEvent.click(nextPageBtn as HTMLButtonElement)
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_6'))

  const previousPageBtn = container.querySelector('.ant-pagination-prev')?.firstChild
  fireEvent.click(previousPageBtn as HTMLButtonElement)

  const headerCheckbox = screen.getByTestId('tableSelect_HeaderCheckbox') as HTMLInputElement

  // Act
  fireEvent.click(headerCheckbox)

  // Assert
  expect(headerCheckbox.checked).toBe(false)
  expect(screen.queryAllByTestId('selectedListElement')).toHaveLength(1)
})

test('selectable row utils: header reverse selection can reverse selected ids on current page', () => {
  // Arrange
  render(<TableExample />)
  fireEvent.click(screen.getByTestId('tableSelect_rowcheckbox_1'))
  const headerDropdown = screen.getByTestId('tableSelect_HeaderDropdown') as HTMLInputElement
  fireEvent.click(headerDropdown)
  const reverseSelection = screen.getByTestId('tableSelect_ReverseSelection') as HTMLElement

  // Act
  fireEvent.click(reverseSelection)

  // Assert
  expect(screen.queryAllByTestId('selectedListElement')).toHaveLength(4)
})
