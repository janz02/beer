import { render, screen } from '@testing-library/react'
import { Roles } from 'api/swagger/coupon'
import React from 'react'
import { setupPermissions, setupStore } from '../../../../../config/setupMocks'
import { BrowserRouter as Router } from 'react-router-dom'
import { GroupViewPage } from './GroupViewPage'
import moment from 'moment'

jest.mock('app/store')

setupStore({
  groupEditor: {
    permissions: [
      {
        id: 35,
        name: 'teszt001'
      },
      {
        id: 37,
        name: 'teszt002'
      }
    ],
    profiles: [
      {
        id: 2,
        name: 'Tibi',
        status: 'Active',
        groupCount: 4,
        permissionCount: 1,
        jobRoleId: 1,
        jobRoleName: '#One Job',
        companyId: 3,
        companyName: 'Best Company',
        campaignCount: 4
      }
    ],
    profileListParams: {
      pageSize: 10,
      page: 1,
      from: 1,
      to: 1,
      size: 1
    },
    isLoading: false,
    isProfilesLoading: false,
    isPermissionsLoading: false,
    hasError: false,
    profileTotalCount: 1,
    group: {
      id: 5,
      name: 'körte',
      createdDate: moment('2020-11-20T12:53:04.666Z'),
      createdBy: 'somebody I used to know',
      profileCount: 1,
      companyCount: 3,
      jobRoleCount: 2,
      permissionsCount: 2
    },
    permissionTotalCount: 2
  }
})

const TestGroupView: React.FC = () => {
  return (
    <Router>
      <GroupViewPage />
    </Router>
  )
}

test('base data appears on the page', () => {
  // Arrange

  // Act
  render(<TestGroupView />)

  // Assert
  expect(screen.queryByText(/körte/)).toBeTruthy()
  expect(screen.queryByText(/somebody I used to know/)).toBeTruthy()
})

test('profiles appear in the profiles list', () => {
  // Arrange

  // Act
  render(<TestGroupView />)

  // Assert
  expect(screen.queryByText(/#One Job/)).toBeTruthy()
  expect(screen.queryByText(/Tibi/)).toBeTruthy()
  expect(screen.queryByText(/Best Company/)).toBeTruthy()
})

test('roles appears on the page', () => {
  // Arrange

  // Act
  render(<TestGroupView />)

  // Assert
  expect(screen.queryByText(/teszt001/)).toBeTruthy()
  expect(screen.queryByText(/teszt002/)).toBeTruthy()
})

test('status badges are correct for the contained profiles', () => {
  // Arrange

  // Act
  render(<TestGroupView />)

  // Assert
  expect(screen.queryAllByText(/\bActive\b/)).toHaveLength(1)
  expect(screen.queryAllByText(/\bWaiting for approval\b/)).toHaveLength(0)
  expect(screen.queryAllByText(/\bDeclined\b/)).toHaveLength(0)
})

test('admins can edit profiles and unassign permissions too', () => {
  // Arrange
  setupPermissions([Roles.Administrator])

  // Act
  render(<TestGroupView />)

  // Assert
  expect(screen.getAllByLabelText('form')).toHaveLength(1)
  expect(screen.getAllByLabelText('disconnect')).toHaveLength(3)
})

test('other users cant unassign and edit profiles', () => {
  // Arrange
  setupPermissions([])

  // Act
  render(<TestGroupView />)

  // Assert
  expect(screen.queryByLabelText(/aria-label="form"/)).toBeFalsy()
  expect(screen.queryByLabelText(/aria-label="disconnect"/)).toBeFalsy()
})
