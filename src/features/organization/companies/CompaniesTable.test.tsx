import { render, screen } from '@testing-library/react'
import { Roles } from 'api/swagger/coupon'
import { FeatureState } from 'models/featureState'
import moment from 'moment'
import React from 'react'
import { setupPermissions, setupStore } from '../../../../config/setupMocks'
import { CompaniesTable } from './CompaniesTable'
import { useCompaniesUtils } from './useCompaniesUtils'

jest.mock('app/store')

setupStore({
  companies: {
    companies: [
      {
        id: 1,
        name: 'Test',
        isActive: false,
        createdDate: moment('0000-12-31T22:43:40.000Z'),
        profileCount: 4,
        groupCount: 2,
        jobRoleCount: 3,
        campaignCount: 1
      },
      {
        id: 2,
        name: 'string2',
        isActive: true,
        createdDate: moment('0000-12-31T22:43:40.000Z'),
        profileCount: 4,
        groupCount: 2,
        jobRoleCount: 3,
        campaignCount: 1
      },
      {
        id: 3,
        name: 'string12',
        isActive: true,
        createdDate: moment('0000-12-31T22:43:40.000Z'),
        profileCount: 4,
        groupCount: 2,
        jobRoleCount: 3,
        campaignCount: 1
      },
      {
        id: 4,
        name: 'string',
        isActive: true,
        createdDate: moment('0000-12-31T22:43:40.000Z'),
        profileCount: 4,
        groupCount: 2,
        jobRoleCount: 3,
        campaignCount: 1
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

const TestCompaniesTable: React.FC = () => {
  const companiesUtils = useCompaniesUtils()

  return (
    <div>
      {companiesUtils.tabBarActions}
      <CompaniesTable companiesUtils={companiesUtils} />
    </div>
  )
}

test('companies appear in the list', () => {
  // Arrange

  // Act
  render(<TestCompaniesTable />)

  // Assert
  expect(screen.queryByText(/\bstring12\b/)).not.toBeFalsy()
})

test('status switches are correct', () => {
  // Arrange

  // Act
  render(<TestCompaniesTable />)

  // Assert
  expect(screen.queryAllByText(/\bActive\b/)).toHaveLength(3)
  expect(screen.queryAllByText(/\bInactive\b/)).toHaveLength(1)
})

test('admins have crud buttons', () => {
  // Arrange
  setupPermissions([Roles.Administrator])

  // Act
  render(<TestCompaniesTable />)

  // Assert
  expect(screen.getAllByLabelText('delete')).toBeTruthy()
})

test('other users dont have crud buttons', () => {
  // Arrange
  setupPermissions([])

  // Act
  render(<TestCompaniesTable />)

  // Assert
  expect(screen.queryByLabelText(/aria-label="delete"/)).toBeFalsy()
})
