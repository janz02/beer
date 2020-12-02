import { render, screen } from '@testing-library/react'
import { Roles } from 'api/swagger/coupon'
import { FeatureState } from 'models/featureState'
import moment from 'moment'
import React from 'react'
import { setupPermissions, setupStore } from '../../../../config/setupMocks'
import { GroupsTable } from './GroupsTable'
import { useGroupsUtils } from './useGroupsUtils'

jest.mock('app/store')

setupStore({
  groups: {
    groups: [
      {
        id: 1,
        name: '2iqSmhPKn9',
        profileCount: 2,
        companyCount: 7,
        jobRoleCount: 9,
        permissionsCount: 4,
        createdDate: moment(),
        createdBy: 'D3YnRJp3Ff'
      },
      {
        id: 2,
        name: 'eHh5VFc5v8',
        profileCount: 2,
        companyCount: 7,
        jobRoleCount: 5,
        permissionsCount: 8,
        createdDate: moment(),
        createdBy: '9wHvUrkvEF'
      },
      {
        id: 3,
        name: '9mKBkEL5nq',
        profileCount: 2,
        companyCount: 0,
        jobRoleCount: 6,
        permissionsCount: 0,
        createdDate: moment(),
        createdBy: 'zZkcJsQ5Yp'
      }
    ],
    savingStatusIds: {},
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

const TestGroupsTable: React.FC = () => {
  const groupsUtils = useGroupsUtils()

  return (
    <div>
      {groupsUtils.tabBarActions}
      <GroupsTable groupsUtils={groupsUtils} />
    </div>
  )
}

test('groups appear in the list', () => {
  // Arrange

  // Act
  render(<TestGroupsTable />)

  // Assert
  expect(screen.queryByText(/\b2iqSmhPKn9\b/)).not.toBeFalsy()
})

test('admins have crud buttons', () => {
  // Arrange
  setupPermissions([Roles.Administrator])

  // Act
  render(<TestGroupsTable />)

  // Assert
  expect(screen.getAllByLabelText('delete')).toBeTruthy()
})

test('other users dont have crud buttons', () => {
  // Arrange
  setupPermissions([])

  // Act
  render(<TestGroupsTable />)

  // Assert
  expect(screen.queryByLabelText(/aria-label="delete"/)).toBeFalsy()
})
