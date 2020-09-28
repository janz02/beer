import { render } from 'enzyme'
import React from 'react'
import { setupStore } from '../../../config/setupMocks'
import { Table } from 'antd'
import { useBpHistoryControl } from './useBpHistoryControl'

jest.mock('app/store')
setupStore({
  bpHistory: {
    bpHistoryItems: [
      {
        id: 1,
        campaignName: 'Campaign name 1',
        campaignTechnicalName: '',
        createdDate: '2020-03-25T18:30:29.639Z',
        bpId: 'Példa 1',
        contact: 'pelda@pelda.hu',
        channelId: 1,
        event: 'Internal.CrossDomain.CampaignDiscrateTimeTrigger',
        eventResult: '',
        campaignResult: '',
        templateId: 1
      },
      {
        id: 2,
        campaignName: 'Campaign name 2',
        campaignTechnicalName: '',
        createdDate: '2020-03-25T18:30:29.639Z',
        bpId: 'Példa 2',
        contact: 'pelda2@pelda2.hu',
        channelId: 2,
        event: 'Internal.CrossDomain.CampaignDiscrateTimeTrigger',
        eventResult: '',
        campaignResult: '',
        templateId: 2
      }
    ],
    listParams: {
      pageSize: 10
    },
    error: false,
    loading: false,
    template: null
  }
})

const BpHistoryTableContent: React.FC = () => {
  const {
    loading,
    columnOrder,
    paginationConfig,
    source,
    handleTableChange
  } = useBpHistoryControl()
  return (
    <Table
      loading={loading}
      columns={columnOrder.currentColumns}
      dataSource={source}
      pagination={paginationConfig}
      onChange={handleTableChange}
    />
  )
}

describe('bp history table tests', () => {
  it('should render', () => {
    // Act
    const tabContent = render(<BpHistoryTableContent />)

    // Assert
    expect(tabContent.html()).toBeDefined()
    // expect(tabContent.html()).toContain('Permission1')
  })

  // it('should render history items', () => {
  //   // Act
  //   const tabContent = render(<BpHistoryTableContent />)

  //   // Assert
  //   expect(tabContent.html()).toContain('Campaign name 1')
  // })
})
