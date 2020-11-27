import { render, screen } from '@testing-library/react'
import moment from 'moment'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { setupStore, setupUseParams } from '../../../../config/setupMocks'
import { ProfileEditorPage } from './ProfileEditorPage'

jest.mock('app/store')

setupStore({
  profileEditor: {
    companies: [
      {
        id: 1,
        name: 'testCompany',
        isActive: true,
        createdDate: moment('0000-12-31T22:43:40.000Z'),
        profileCount: 2,
        groupCount: 2,
        jobRoleCount: 2,
        campaignCount: 0
      }
    ],
    groups: [
      {
        id: 1,
        name: 'testGroup',
        createdDate: moment('2020-11-19T20:35:05.592Z'),
        createdBy: 'NOT_IMPLEMENTED',
        profileCount: 1,
        companyCount: 1,
        jobRoleCount: 1,
        permissionsCount: 0
      }
    ],
    jobRoles: [
      {
        id: 1,
        name: 'testJobRole',
        createdDate: moment('2020-11-20T12:21:59.491Z'),
        createdBy: 'NOT_IMPLEMENTED',
        profileCount: 6,
        groupCount: 5,
        companyCount: 4
      }
    ],
    error: false,
    loading: false,
    saving: false,
    profile: {
      id: 1,
      name: 'Superman',
      status: 'Active',
      userName: 'sman',
      email: 'superman@álpad.áéő',
      createdDate: moment('2020-11-20T12:24:15.497Z'),
      groupCount: 1,
      permissionCount: 0,
      jobRoleId: 1,
      jobRoleName: 'testJobRole',
      birthDay: moment('2020-11-20T00:00:00.000'),
      phoneNumber: 'phoneNumber',
      companyId: 1,
      companyName: 'testCompany',
      groupIds: [1]
    }
  }
})

setupUseParams({ profileId: 1 })

const ProfileEditorPageInRouter: React.FC = () => {
  return (
    <MemoryRouter>
      <ProfileEditorPage />
    </MemoryRouter>
  )
}

test('form control values are filled', () => {
  // Arrange

  // Act
  render(<ProfileEditorPageInRouter />)

  // Assert
  expect((screen.getByLabelText('Name') as HTMLInputElement).value).toBe('Superman')
  expect((screen.getByLabelText('Birthday') as HTMLInputElement).value).toBe('2020-11-20')
  expect(screen.getByText('sman')).toBeTruthy()
  expect((screen.getByLabelText('E-mail') as HTMLInputElement).value).toBe('superman@álpad.áéő')
  expect(screen.getByDisplayValue('phoneNumber')).toBeTruthy()
  expect(screen.getByText('testCompany')).toBeTruthy()
  expect(screen.getByText('testGroup')).toBeTruthy()
  expect(screen.getByText('testJobRole')).toBeTruthy()
})
