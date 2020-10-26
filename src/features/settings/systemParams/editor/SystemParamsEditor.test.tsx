import '@testing-library/jest-dom'
import React from 'react'
import { FeatureState } from 'models/featureState'
import { Roles } from 'api/swagger/coupon'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import { setupPermissions, setupStore, setupUseParams } from '../../../../../config/setupMocks'
import { useSystemParamsTabUtils } from '../tab/useSystemParamsTabUtils'

jest.mock('app/store')

setupUseParams({ id: 0, tab: 'system-params' })

setupStore({
  systemParams: {
    systemParamsList: [
      {
        key: 'example_key0',
        id: 0,
        value: 'Some value0',
        name: 'example_key0 name',
        description: 'example_key0 description'
      },
      {
        key: 'example_key1',
        id: 1,
        value: 'Some value1',
        name: 'example_key1 name',
        description: 'example_key1 description'
      }
    ],
    listParams: {
      pageSize: 10
    },
    listState: FeatureState.Initial,
    editorState: FeatureState.Initial
  }
})

const SystemParamsTabContent: React.FC = () => {
  return (
    <MemoryRouter>
      <Route>{useSystemParamsTabUtils().tabContent}</Route>
    </MemoryRouter>
  )
}

beforeEach(() => {
  // Arrange
  setupPermissions([Roles.Administrator])

  // Act
  const { container } = render(<SystemParamsTabContent />)
  const editButton = container.querySelector('button[name="crudEdit"]')
  fireEvent.click(editButton as any)
})

test('edit window has all form fields', () => {
  const nameField = screen.getByLabelText(/Parameter name/)
  const descriptionField = screen.getByLabelText(/Parameter description/)
  const valueField = screen.getByLabelText(/Parameter value/)

  // Assert
  expect(nameField).toBeInTheDocument()
  expect(descriptionField).toBeInTheDocument()
  expect(valueField).toBeInTheDocument()
})

test('name and description are not editable', () => {
  const nameField = screen.getByLabelText(/Parameter name/)
  const descriptionField = screen.getByLabelText(/Parameter description/)

  // Assert
  expect(nameField).toHaveAttribute('disabled')
  expect(descriptionField).toHaveAttribute('disabled')
})

test('value field is editable', () => {
  const valueField = screen.getByLabelText(/Parameter value/)

  // Assert
  expect(valueField).not.toHaveAttribute('disabled')
})

test('value field has maximum of 500 character length', () => {
  const valueField = screen.getByLabelText(/Parameter value/)

  // Assert
  expect(valueField).toHaveAttribute('maxLength')
  expect(valueField.getAttribute('maxLength')).toBe('500')
})
