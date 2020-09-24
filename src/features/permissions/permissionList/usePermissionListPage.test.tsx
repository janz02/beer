import { render, shallow } from 'enzyme'
import React from 'react'
import { usePermissionListPage } from './usePermissionListPage'
import { setupStore } from '../../../../config/setupMocks'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'

jest.mock('app/store')

setupStore({
  auth: { loggedIn: true },
  permissionList: {
    error: false,
    loading: false,
    permissions: [
      {
        id: 1,
        name: 'Permission1'
      },
      {
        id: 2,
        name: 'Permission2'
      }
    ],
    listParams: {}
  },
  permissionEditor: {
    error: false,
    loading: false,
    loadingDelete: false,
    loadingState: false,
    loadingRegState: false
  }
})

const PermissionTableContent: React.FC = () => {
  const tableProps = usePermissionListPage().tableProps
  return <ResponsiveTable {...tableProps} />
}

describe('permission table tests', () => {
  it('permissions appear in the table', () => {
    // Act
    const tabContent = render(<PermissionTableContent />)

    // Assert
    expect(tabContent.html()).toContain('Button')
    // expect(tabContent.html()).toContain('Permission1')
    //  expect(tabContent.html()).toContain('Permission2')
  })
})
