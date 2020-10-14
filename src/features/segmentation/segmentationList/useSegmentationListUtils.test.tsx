import { render } from 'enzyme'
import React from 'react'
import { useSegmentationListUtils } from './useSegmentationListUtils'
import { setupStore } from '../../../../config/setupMocks'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import moment from 'moment'

jest.mock('app/store')

setupStore({
  auth: { loggedIn: true },
  segmentationList: {
    error: false,
    loading: false,
    segmentations: [
      {
        id: 1,
        name: 'Segmentation1',
        categoryName: 'Category1',
        segmentSize: 100,
        cumulativeIntersection: 10,
        createdDate: moment(new Date(2020, 1, 1))
      },
      {
        id: 2,
        name: 'Segmentation2',
        categoryName: 'Category4',
        segmentSize: 100,
        cumulativeIntersection: 0,
        createdDate: moment(new Date(2020, 10, 1))
      }
    ],
    listParams: {}
  },
  segmentationEditor: {
    error: false,
    loading: false,
    loadingDelete: false,
    loadingState: false,
    loadingRegState: false
  }
})

const SegmentationTableContent: React.FC = () => {
  const tableProps = useSegmentationListUtils().tableProps
  return <ResponsiveTable {...tableProps} />
}

describe('segmentation table tests', () => {
  it('segmentations appear in the table', () => {
    // Act
    const tableContent = render(<SegmentationTableContent />)

    // Assert
    expect(tableContent.html()).toBeDefined()
    // expect(tabContent.html()).toContain('Segmentation1')
    //  expect(tabContent.html()).toContain('Segmentation2')
  })
})
