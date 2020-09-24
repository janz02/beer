import { render } from 'enzyme'
import React from 'react'
import { setupUseParams, setupStore } from '../../../../config/setupMocks'
import { FeatureState } from 'models/featureState'
import { OrderByType } from 'api/swagger/coupon'
import moment from 'moment'
import { useProductTab } from './useProductTab'

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
  return useProductTab().tabContent
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
})
