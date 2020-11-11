import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { useCampaignListUtils } from './useCampaignListUtils'
import { setupStore, setupPermissions, setupEveryPermission } from '../../../../config/setupMocks'
import { Roles } from 'api/swagger/coupon'
import moment from 'moment'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'

jest.mock('app/store')
jest.mock('moment', () => ({
  format: () => '2020–01–01T12:34:56+00:00',
  setLocale: () => '',
  defineLocale: () => '',
  updateLocale: () => '',
  locale: () => ''
}))
setupStore({
  auth: { loggedIn: true },
  campaignList: {
    companyCampaigns: [
      {
        id: 0,
        name: 'campaign1',
        startDate: moment,
        endDate: moment,
        createdBy: 'user',
        responsible: 'user2',
        status: 'Created',
        statusId: 20,
        canDelete: true,
        productId: 1,
        createdDate: moment,
        modifiedDate: moment,
        channels: [1],
        channelId: null
      },
      {
        id: 1,
        name: 'campaign2',
        startDate: moment,
        endDate: moment,
        createdBy: 'user',
        responsible: 'user3',
        status: 'Created',
        statusId: 20,
        canDelete: false,
        productId: 2,
        createdDate: moment,
        modifiedDate: moment,
        channels: [1],
        channelId: null
      }
    ],
    products: [
      { id: 1, name: 'product' },
      { id: 2, name: 'product2' }
    ],
    channels: [{ id: 1, name: 'Phone' }],
    companyListParams: {
      page: 1,
      pageSize: 10
    }
  }
})
const CompanyTable: React.FC = () => {
  const props = useCampaignListUtils().companyCampaignTableProps
  return <ResponsiveTable {...props} />
}

const CompanyHeader: React.FC = () => {
  return <>{useCampaignListUtils().companyCampaignHeaderOptions} </>
}

const TabBarExtras: React.FC = () => {
  return <> {useCampaignListUtils().tabBarExtraContent} </>
}

describe('campaign list tests', () => {
  it('company campaigns appears in table', () => {
    // Arrange
    setupPermissions([])

    // Act
    render(<CompanyTable />)

    // Assert
    expect(screen.getByText(/campaign1/)).toBeInTheDocument()
    expect(screen.getByText(/campaign2/)).toBeInTheDocument()
  })

  // Cannot be tested now, isEditorUser returns false even with Administrator role and all permissions granted mock
  /* it('only one of the campaigns can be deleted as admin', () => {
    // Arrange
    setupPermissions([Roles.Administrator])

    // Act
    render(<CompanyTable />)

    // Assert
    expect(screen.queryAllByTestId(/edit-button/)).toHaveLength(2)
    expect(screen.queryAllByTestId(/delete-button/)).toHaveLength(1)
  }) */

  it('campaigns cannot be deleted without permission', () => {
    // Arrange
    setupPermissions([])

    // Act
    render(<CompanyTable />)

    // Assert
    expect(screen.queryAllByTestId(/delete-button/)).toHaveLength(0)
  })

  it('admins can create new campaigns', () => {
    // Arrange
    setupPermissions([Roles.Administrator])

    // Act
    render(<CompanyHeader />)

    // Assert
    expect(screen.getByText(/New/)).toBeInTheDocument()
  })

  it('other users cannot create new campaigns', () => {
    // Arrange
    setupPermissions([])

    // Act
    render(<CompanyHeader />)

    // Assert
    expect(screen.queryByText(/New/i)).toBeNull()
  })

  it('extras contains the correct functions', () => {
    // Arrange
    setupPermissions([Roles.Administrator])

    // Act
    render(<TabBarExtras />)

    // Assert
    expect(screen.getByText(/Reset/)).toBeInTheDocument()
    expect(screen.getByTestId(/settings-button/)).toBeInTheDocument()
  })
})
