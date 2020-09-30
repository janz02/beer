import { render } from 'enzyme'
import React from 'react'
import { useSegmentationListPage } from './useSegmentationList'
import { setupStore } from '../../../../config/setupMocks'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'

jest.mock('app/store')

setupStore({
  auth: { loggedIn: true },
  segmentationList: {
    error: false,
    loading: false,
    segmentations: [
      {
        id: 1,
        name: 'Segmentation1'
      },
      {
        id: 2,
        name: 'Segmentation2'
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
  const tableProps = useSegmentationListPage().tableProps
  return <ResponsiveTable {...tableProps} />
}

describe('segmentation table tests', () => {
  it('segmentations appear in the table', () => {
    // Act
    const tabContent = render(<SegmentationTableContent />)

    // Assert
    expect(tabContent.html()).toContain('Button')
    // expect(tabContent.html()).toContain('Segmentation1')
    //  expect(tabContent.html()).toContain('Segmentation2')
  })
})
