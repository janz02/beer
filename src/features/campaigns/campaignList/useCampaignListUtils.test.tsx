import { render } from 'enzyme'
import React from 'react'
import { useCampaignListUtils } from './useCampaignListUtils'
import { setupStore, setupPermissions } from '../../../../config/setupMocks'
import { Roles } from 'api/swagger/coupon'
import moment from 'moment'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'

jest.mock('app/store')

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
  /* it('company campaigns appears in table', () => {
    // Arrange
    setupPermissions([])

    // Act
    const table = render(<CompanyTable />)

    // Assert
    expect(table.html()).toContain('campaign1')
    expect(table.html()).toContain('campaign2')
  }) */

  it('only one of the campaigns can be deleted as admin', () => {
    // Arrange
    setupPermissions([Roles.Administrator])

    // Act
    const table = render(<CompanyTable />)

    // Assert
    expect(table.html()).toContain('crudEdit')
  })

  it('campaigns cannot be deleted without permission', () => {
    // Arrange
    setupPermissions([])

    // Act
    const table = render(<CompanyTable />)

    // Assert
    expect(table.html()).not.toContain('crudEdit')
  })

  it('admins can create new campaigns', () => {
    // Arrange
    setupPermissions([Roles.Administrator])

    // Act
    const headerContent = render(<CompanyHeader />)

    // Assert
    expect(headerContent.html()).toContain('New')
  })

  it('other users cannot create new campaigns', () => {
    // Arrange
    setupPermissions([])

    // Act
    const headerContent = render(<CompanyHeader />)

    // Assert
    expect(headerContent.html()).toBe(' ')
  })

  /* it('extras contains the correct functions', () => {
    // Arrange
    setupPermissions([Roles.Administrator])

    // Act
    const extras = render(<TabBarExtras />)

    // Assert
    expect(extras.html()).toContain('reset')
  }) */
})
