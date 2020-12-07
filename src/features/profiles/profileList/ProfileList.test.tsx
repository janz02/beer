import { render, screen } from '@testing-library/react'
import { ProfileStatus } from 'api/swagger/admin'
import { Roles } from 'api/swagger/coupon'
import { FeatureState } from 'models/featureState'
import React from 'react'
import { setupPermissions, setupStore } from '../../../../config/setupMocks'
import { ProfileList } from './ProfileList'
import { BrowserRouter as Router } from 'react-router-dom'

jest.mock('app/store')

setupStore({
  profileList: {
    profiles: [
      {
        id: 1,
        status: ProfileStatus.WaitingForApproval,
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
        status: ProfileStatus.Declined,
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

const TestProfileList: React.FC = () => {
  return (
    <Router>
      <ProfileList />
    </Router>
  )
}

test('profiles appear in the list', () => {
  // Arrange

  // Act
  render(<TestProfileList />)

  // Assert
  expect(screen.queryByText(/\bVLAcHYhZ5B\b/)).toBeTruthy()
})

test('status badges are correct', () => {
  // Arrange

  // Act
  render(<TestProfileList />)

  // Assert
  expect(screen.queryAllByText(/\bActive\b/)).toHaveLength(0)
  // Lengths are 2 because the tab headers are also called the same
  expect(screen.queryAllByText(/\bWaiting for approval\b/)).toHaveLength(2)
  expect(screen.queryAllByText(/\bDeclined\b/)).toHaveLength(2)
})

test('admins can approve or decline', () => {
  // Arrange
  setupPermissions([Roles.Administrator])

  // Act
  render(<TestProfileList />)

  // Assert
  expect(screen.getAllByLabelText('check-circle')).toBeTruthy()
  expect(screen.getAllByLabelText('close-circle')).toBeTruthy()
})

test('other users dont have crud buttons', () => {
  // Arrange
  setupPermissions([])

  // Act
  render(<TestProfileList />)

  // Assert
  expect(screen.queryByLabelText(/aria-label="check-circle"/)).toBeFalsy()
  expect(screen.queryByLabelText(/aria-label="close-circle"/)).toBeFalsy()
})
