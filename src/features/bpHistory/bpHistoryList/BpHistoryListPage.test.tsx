import React from 'react'
import { render } from 'enzyme'
import { BpHistoryListPage } from './BpHistoryListPage'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../app/i18n'
import { setupStore } from '../../../../config/setupMocks'

const useBpHistoryControl = require('../useBpHistoryControl')

jest.mock('app/store')

const mockStore = {
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
}

const mockColumnOrder = {
  visible: true,
  currentColumns: [],
  tempColumns: [],
  hiddenColumns: [],
  handleChangeVisibility: () => {},
  handleApplyChanges: () => {},
  handleResetToDefault: () => {},
  addColumn: value => {},
  addOrRemoveAllColumn: value => {},
  hideColumn: column => {},
  onDragEnd: result => {}
}

const mockHook = {
  loading: false,
  columnOrder: mockColumnOrder,
  paginationConfig: false,
  templateModal: { title: null, content: null },
  source: [...mockStore.bpHistory.bpHistoryItems],
  handleResetFilters: () => {},
  handleTemplateCloseClick: () => {},
  handleTableChange: () => {},
  loadHistory: () => {}
}

setupStore(mockStore)

const BpHistoryListComponent = () => (
  <I18nextProvider i18n={i18n}>
    <BpHistoryListPage />
  </I18nextProvider>
)

describe('BP history list tests', () => {
  it('should render', () => {
    const listPage = render(<BpHistoryListComponent />)
    // Assert
    expect(listPage).toBeDefined()
  })

  it('should render history items', () => {
    const myHook = jest
      .spyOn(useBpHistoryControl, 'useBpHistoryControl')
      .mockImplementation(() => ({ ...mockHook }))

    const listPage = render(<BpHistoryListComponent />)

    // Assert
    expect(myHook).toHaveBeenCalled()
    // expect(myHook.loading).toBe(false) // this does not work
  })
})
