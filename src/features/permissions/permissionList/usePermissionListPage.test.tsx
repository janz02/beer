import '@testing-library/jest-dom'
import React from 'react'
import { usePermissionListPage } from './usePermissionListPage'
import { setupStore } from '../../../../config/setupMocks'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { render, screen } from '@testing-library/react'

jest.mock('app/store')

setupStore({
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
  const { tableProps } = usePermissionListPage()

  return <ResponsiveTable {...tableProps} />
}

test('permissions appear in the table', () => {
  render(<PermissionTableContent />)

  expect(screen.getByText(/Permission1/)).toBeInTheDocument()
  expect(screen.getByText(/Permission2/)).toBeInTheDocument()
})
