import { render, screen } from '@testing-library/react'
import { Roles } from 'api/swagger/coupon'
import { FeatureState } from 'models/featureState'
import moment from 'moment'
import React from 'react'
import { setupPermissions, setupStore } from '../../../../config/setupMocks'
import { JobRolesTable } from './JobRolesTable'
import { useJobRoleListUtils } from './useJobRoleListUtils'

jest.mock('app/store')

setupStore({
  jobRoleList: {
    jobRoles: [
      {
        id: 1,
        name: 'Test',
        createdDate: moment('0000-12-31T22:43:40.000Z'),
        profileCount: 4,
        groupCount: 2,
        companyCount: 1,
        createdBy: 'Johanna'
      },
      {
        id: 2,
        name: 'string2',
        createdDate: moment('0000-12-31T22:43:40.000Z'),
        profileCount: 4,
        groupCount: 2,
        companyCount: 1,
        createdBy: 'Josef'
      },
      {
        id: 3,
        name: 'string12',
        createdDate: moment('0000-12-31T22:43:40.000Z'),
        profileCount: 4,
        groupCount: 2,
        companyCount: 1,
        createdBy: 'Adam'
      },
      {
        id: 4,
        name: 'string',
        createdDate: moment('0000-12-31T22:43:40.000Z'),
        profileCount: 4,
        groupCount: 2,
        companyCount: 3,
        createdBy: 'Emilia'
      }
    ],
    listParams: {
      pageSize: 10,
      page: 1,
      from: 1,
      to: 4,
      size: 4
    },
    listState: FeatureState.Success
  }
})

const TestJobRolesTable: React.FC = () => {
  const jobRoleListUtils = useJobRoleListUtils()

  return (
    <div>
      {jobRoleListUtils.tabBarActions}
      <JobRolesTable jobRoleListUtils={jobRoleListUtils} />
    </div>
  )
}

test('jobRoles appear in the list', () => {
  // Arrange

  // Act
  render(<TestJobRolesTable />)

  // Assert
  expect(screen.queryByText(/\bstring12\b/)).not.toBeFalsy()
})

test('admins have crud buttons', () => {
  // Arrange
  setupPermissions([Roles.Administrator])

  // Act
  render(<TestJobRolesTable />)

  // Assert
  expect(screen.getAllByLabelText('delete')).toBeTruthy()
})

test('other users dont have crud buttons', () => {
  // Arrange
  setupPermissions([])

  // Act
  render(<TestJobRolesTable />)

  // Assert
  expect(screen.queryByLabelText(/aria-label="delete"/)).toBeFalsy()
})
