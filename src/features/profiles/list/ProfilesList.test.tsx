import { render, screen } from '@testing-library/react'
import { Roles } from 'api/swagger/coupon'
import { FeatureState } from 'models/featureState'
import React from 'react'
import { setupPermissions, setupStore } from '../../../../config/setupMocks'
import { ProfilesList } from './ProfilesList'

jest.mock('app/store')

setupStore({
  profiles: {
    profiles: [
      {
        id: 1,
        status: 'waiting-for-approval',
        name: '7oTiXBuSf7',
        username: '7otixbusf7',
        email: '7otixbusf7@test.com',
        group: 'Efm89zCQGf',
        permissions: 8,
        createdDate: '2020-11-13T07:46:36.496Z',
        company: 'company',
        jobRole: 'job'
      },
      {
        id: 2,
        status: 'declined',
        name: 'VLAcHYhZ5B',
        username: 'vlachyhz5b',
        email: 'vlachyhz5b@test.com',
        group: 't6uqCuLFIA',
        permissions: 3,
        createdDate: '2020-11-13T07:46:36.497Z',
        company: 'company',
        jobRole: 'job'
      }
    ],
    listParams: {
      pageSize: 10,
      page: 1,
      from: 1,
      to: 10,
      size: 10
    },
    listState: FeatureState.Success
  }
})

test('profiles appear in the list', () => {
  // Arrange

  // Act
  render(<ProfilesList />)

  // Assert
  expect(screen.queryByText(/\bVLAcHYhZ5B\b/)).toBeTruthy()
})

test('status badges are correct', () => {
  // Arrange

  // Act
  render(<ProfilesList />)

  // Assert
  expect(screen.queryAllByText(/\bprofiles.status.active\b/)).toHaveLength(0)
  expect(screen.queryAllByText(/\bprofiles.status.declined\b/)).toHaveLength(1)
  expect(screen.queryAllByText(/\bprofiles.status.waiting-for-approval\b/)).toHaveLength(1)
})

test('admins can approve or decline', () => {
  // Arrange
  setupPermissions([Roles.Administrator])

  // Act
  render(<ProfilesList />)

  // Assert
  expect(screen.getAllByLabelText('check-circle')).toBeTruthy()
  expect(screen.getAllByLabelText('close-circle')).toBeTruthy()
})

test('other users dont have crud buttons', () => {
  // Arrange
  setupPermissions([])

  // Act
  render(<ProfilesList />)

  // Assert
  expect(screen.queryByLabelText(/aria-label="check-circle"/)).toBeFalsy()
  expect(screen.queryByLabelText(/aria-label="close-circle"/)).toBeFalsy()
})
