import '@testing-library/jest-dom'
import React from 'react'
import { useTestGroupCategoryTabUtils } from './useTestGroupCategoryTabUtils'
import { setupPermissions, setupStore, setupUseParams } from '../../../../config/setupMocks'
import { OrderByType } from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'
import moment from 'moment'
import { Roles } from 'api/swagger/coupon'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'

jest.mock('app/store')

setupUseParams({ id: 1, tab: 'test-group-categories' })

setupStore({
  testGroupCategoryList: {
    categories: [
      {
        id: 0,
        name: 'category1',
        createdDate: moment(new Date(2020, 1, 1))
      },
      {
        id: 1,
        name: 'category2',
        createdDate: moment(new Date(2020, 1, 2))
      }
    ],
    listParams: {
      pageSize: 10,
      orderBy: 'name',
      orderByType: OrderByType.Ascending
    },
    listState: FeatureState.Initial
  },
  testGroupCategoryEditor: {
    category: {},
    editorState: FeatureState.Initial
  }
})

const TestGroupCategoryTabContent: React.FC = () => {
  return (
    <MemoryRouter>
      <Route>{useTestGroupCategoryTabUtils().tabContent}</Route>
    </MemoryRouter>
  )
}

const TestGroupCategoryHeaderContent: React.FC = () => {
  return (
    <MemoryRouter>
      <Route>{useTestGroupCategoryTabUtils().headerOptions}</Route>
    </MemoryRouter>
  )
}

test('TestGroupCategoryTab should contain categories from store', () => {
  // Arrange
  setupPermissions([])

  // Act
  render(<TestGroupCategoryTabContent />)

  // Assert
  expect(screen.getByText(/category1/)).toBeInTheDocument()
  expect(screen.getByText(/category2/)).toBeInTheDocument()
})

test('admins can create new TestGroupCategories', () => {
  // Arrange
  setupPermissions([Roles.Administrator])

  // Act
  render(<TestGroupCategoryHeaderContent />)

  // Assert
  const button = screen.getByText(/Create new testgroup/).closest('button')
  expect(button).toBeInTheDocument()

  // not showing the window after click currently
  // fireEvent.click(button as HTMLButtonElement)
  // expect(screen.getByText(/Category name/)).toBeInTheDocument()
})

test('other users cannot create new TestGroupCategories', () => {
  // Arrange
  setupPermissions([])

  // Act
  render(<TestGroupCategoryHeaderContent />)

  // Assert
  expect(screen.queryByText(/Create new testgroup/)).toBeNull()
})

test('admins have crud buttons', () => {
  // Arrange
  setupPermissions([Roles.Administrator])

  // Act
  render(<TestGroupCategoryTabContent />)

  // Assert
  expect(screen.getAllByLabelText('delete')[0]).toBeInTheDocument()
})

test('other users dont have crud buttons', () => {
  // Arrange
  setupPermissions([])

  // Act
  render(<TestGroupCategoryTabContent />)

  // Assert
  expect(screen.queryByLabelText(/aria-label="delete"/)).toBeNull()
})
