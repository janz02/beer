import React from 'react'
import { render } from 'enzyme'
import { useTestGroupCategoryTab } from './useTestGroupCategoryTab'
import { setupPermissions, setupStore, setupUseParams } from '../../../../config/setupMocks'
import { OrderByType } from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'
import moment from 'moment'
import { Roles } from 'api/swagger/coupon'

jest.mock('app/store')

setupUseParams({ id: 1, tab: 'test-group-categories' })

setupStore({
  testGroupCategoryList: {
    categories: [
      {
        id: 0,
        name: 'category1',
        createdDate: moment(new Date(2020, 1, 1))
      },
      {
        id: 1,
        name: 'category2',
        createdDate: moment(new Date(2020, 1, 2))
      }
    ],
    listParams: {
      pageSize: 10,
      orderBy: 'name',
      orderByType: OrderByType.Ascending
    },
    listState: FeatureState.Initial
  },
  testGroupCategoryEditor: {
    category: {},
    editorState: FeatureState.Initial
  }
})

const TestGroupCategoryTabContent: React.FC = () => {
  return useTestGroupCategoryTab().tabContent
}

const TestGroupCategoryHeaderContent: React.FC = () => {
  return <>{useTestGroupCategoryTab().headerOptions}</>
}

describe('TestGroupCategory tests', () => {
  it('TestGroupCategoryTab should contain categories from store', () => {
    // Arrange
    setupPermissions([])

    // Act
    const tabContent = render(<TestGroupCategoryTabContent />)

    // Assert
    expect(tabContent.html()).toContain('category1')
    expect(tabContent.html()).toContain('category2')
  })

  it('admins can create new TestGroupCategories', () => {
    // Arrange
    setupPermissions([Roles.Administrator])

    // Act
    const headerContent = render(<TestGroupCategoryHeaderContent />)

    // Assert
    expect(headerContent.html()).toContain('Create new testgroup')
  })

  it('other users cannot create new TestGroupCategories', () => {
    // Arrange
    setupPermissions([])

    // Act
    const headerContent = render(<TestGroupCategoryHeaderContent />)

    // Assert
    expect(headerContent.html()).toBeNull()
  })

  it('admins have crud buttons', () => {
    // Arrange
    setupPermissions([Roles.Administrator])

    // Act
    const tabContent = render(<TestGroupCategoryTabContent />)

    // Assert
    expect(tabContent.html()).toContain('aria-label="delete"')
  })

  it('other users dont have crud buttons', () => {
    // Arrange
    setupPermissions([])

    // Act
    const tabContent = render(<TestGroupCategoryTabContent />)

    // Assert
    expect(tabContent.html()).not.toContain('aria-label="delete"')
  })
})
