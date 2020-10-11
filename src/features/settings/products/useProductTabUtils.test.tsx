import { render } from 'enzyme'
import React from 'react'
import { setupUseParams, setupStore, setupPermissions } from '../../../../config/setupMocks'
import { FeatureState } from 'models/featureState'
import { OrderByType, Roles } from 'api/swagger/coupon'
import moment from 'moment'
import { useProductTabUtils } from './useProductTabUtils'

jest.mock('app/store')

setupUseParams({
  tab: 'products'
})

setupStore({
  auth: { loggedIn: true },
  productList: {
    products: [
      {
        id: 1,
        name: 'Product1',
        createdDate: moment()
      },
      {
        id: 2,
        name: 'Product2',
        createdDate: moment()
      }
    ],
    listParams: {
      page: 1,
      pageSize: 10,
      orderBy: 'name',
      orderByType: OrderByType.Ascending
    },
    listState: FeatureState.Initial,
    deleteState: FeatureState.Initial
  },
  productEditor: {
    editorState: FeatureState.Initial
  }
})

const ProductTabContent: React.FC = () => {
  return useProductTabUtils().tabContent
}

const ProductTabHeaderContent: React.FC = () => {
  return <>{useProductTabUtils().headerOptions}</>
}

describe('product list tests', () => {
  it('products appear in the table', () => {
    // Arrange

    // Act
    const tabContent = render(<ProductTabContent />)

    // Assert
    expect(tabContent.html()).toContain('Product1')
    expect(tabContent.html()).toContain('Product2')
  })

  it('admins can create new products', () => {
    // Arrange
    setupPermissions([Roles.Administrator])

    // Act
    const headerContent = render(<ProductTabHeaderContent />)

    // Assert
    expect(headerContent.html()).toContain('Add new')
  })

  it('other users cannot create new products', () => {
    // Arrange
    setupPermissions([])

    // Act
    const headerContent = render(<ProductTabHeaderContent />)

    // Assert
    expect(headerContent.html()).toBeNull()
  })
})
