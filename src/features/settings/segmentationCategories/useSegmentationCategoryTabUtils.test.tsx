import { render } from 'enzyme'
import React from 'react'
import { useSegmentationCategoryTabUtils } from './useSegmentationCategoryTabUtils'
import { setupUseParams, setupStore, setupPermissions } from '../../../../config/setupMocks'
import { FeatureState } from 'models/featureState'
import { OrderByType, Roles } from 'api/swagger/coupon'
import moment from 'moment'

jest.mock('app/store')

setupUseParams({
  tab: 'segmentation-categories'
})

setupStore({
  auth: { loggedIn: true },
  segmentationCategoryList: {
    categories: [
      {
        id: 1,
        name: 'Segmentation1',
        createdDate: moment()
      },
      {
        id: 2,
        name: 'Segmentation2',
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
  segmentationCategoryEditor: {
    editorState: FeatureState.Initial
  }
})

const SegmentationCategoryTabContent: React.FC = () => {
  return useSegmentationCategoryTabUtils().tabContent
}

const SegmentationCategoryHeaderContent: React.FC = () => {
  return <>{useSegmentationCategoryTabUtils().headerOptions}</>
}

describe('segmentation category tests', () => {
  it('categories appear in the table', () => {
    // Arrange
    setupPermissions([])

    // Act
    const tabContent = render(<SegmentationCategoryTabContent />)

    // Assert
    expect(tabContent.html()).toContain('Segmentation1')
    expect(tabContent.html()).toContain('Segmentation2')
  })

  it('admins can create new categories', () => {
    // Arrange
    setupPermissions([Roles.Administrator])

    // Act
    const headerContent = render(<SegmentationCategoryHeaderContent />)

    // Assert
    expect(headerContent.html()).toContain('Add new')
  })

  it('other users cannot create new categories', () => {
    // Arrange
    setupPermissions([])

    // Act
    const headerContent = render(<SegmentationCategoryHeaderContent />)

    // Assert
    expect(headerContent.html()).toBeNull()
  })

  it('admins have crud buttons', () => {
    // Arrange
    setupPermissions([Roles.Administrator])

    // Act
    const tabContent = render(<SegmentationCategoryTabContent />)

    // Assert
    expect(tabContent.html()).toContain('aria-label="delete"')
  })

  it('other users dont have crud buttons', () => {
    // Arrange
    setupPermissions([])

    // Act
    const tabContent = render(<SegmentationCategoryTabContent />)

    // Assert
    expect(tabContent.html()).not.toContain('aria-label="delete"')
  })
})
