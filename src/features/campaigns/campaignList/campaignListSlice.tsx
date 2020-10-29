import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { CampaignListItem } from 'models/campaign/campaign'
import moment from 'moment'

export type CampaignListTab = 'company' | 'partner'

interface CampaignListState {
  companyCampaigns: CampaignListItem[]
  partnerCampaigns: CampaignListItem[]
  error: boolean
  loading: boolean
  companyListParams: ListRequestParams
  partnerListParams: ListRequestParams
}

const initialState: CampaignListState = {
  error: false,
  loading: false,
  companyCampaigns: [],
  partnerCampaigns: [],
  companyListParams: {
    pageSize: 10
  },
  partnerListParams: {
    pageSize: 10
  }
}

const campaignListSlice = createSlice({
  name: 'campaignListSlice',
  initialState,
  reducers: {
    resetCampaignsList: () => initialState,
    resetCompanyListParams(state) {
      state.companyCampaigns = initialState.companyCampaigns
    },
    resetPartnerListParams(state) {
      state.partnerListParams = initialState.partnerListParams
    },
    getCampaignsRequest(state) {
      state.loading = true
    },
    getCompanyCampaignsSuccess(
      state,
      action: PayloadAction<{ campaigns: CampaignListItem[]; listParams: ListRequestParams }>
    ) {
      state.companyCampaigns = action.payload.campaigns
      state.companyListParams = action.payload.listParams
      state.loading = false
      state.error = false
    },
    getPartnerCampaignsSuccess(
      state,
      action: PayloadAction<{ campaigns: CampaignListItem[]; listParams: ListRequestParams }>
    ) {
      state.partnerCampaigns = action.payload.campaigns
      state.partnerListParams = action.payload.listParams
      state.loading = false
      state.error = false
    },
    getCampaignsFail(state) {
      state.loading = false
      state.error = true
    },
    deleteSuccess(state) {
      state.loading = false
      state.error = false
    }
  }
})

const {
  resetCompanyListParams,
  resetPartnerListParams,
  getCampaignsRequest,
  getCompanyCampaignsSuccess,
  getCampaignsFail,
  deleteSuccess
} = campaignListSlice.actions
export const { resetCampaignsList } = campaignListSlice.actions

export const campaignsListReducer = campaignListSlice.reducer

const getCompanyCampaigns = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getCampaignsRequest())

    const revisedParams = reviseListRequestParams(getState().campaignList.companyListParams, params)

    const { items, ...pagination } = await api.campaignEditor.campaigns.getCampaigns(revisedParams)
    const campaigns =
      items?.map<CampaignListItem>(campaign => ({
        ...(campaign as CampaignListItem),
        startDate: moment(campaign.startDate),
        endDate: moment(campaign.endDate),
        createdDate: moment(campaign.createdDate),
        modifiedDate: moment(campaign.modifiedDate)
      })) ?? []
    dispatch(
      getCompanyCampaignsSuccess({
        campaigns: campaigns,
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(getCampaignsFail())
  }
}

const deleteCompanyCampaign = (id: number): AppThunk => async (dispatch, getState) => {
  try {
    await api.campaignEditor.campaigns.deleteCampaign({ id })
    dispatch(deleteSuccess())
    const newPage = recalculatePaginationAfterDeletion(getState().campaignList.companyListParams)
    dispatch(getCompanyCampaigns({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(getCampaignsFail())
    return { id, error: err.toString() }
  }
}

const exportCompanyCampaigns = (): void => {
  // TODO
}

const getPartnerCampaigns = (): AppThunk => async () => {
  // TODO
}

const deletePartnerCampaign = (): AppThunk => async () => {
  // TODO
}

const exportPartnerCampaigns = (): void => {
  // TODO
}

const resetCampaignFilters = (): AppThunk => async dispatch => {
  dispatch(resetCompanyListParams())
  dispatch(resetPartnerListParams())
  dispatch(getCompanyCampaigns())
  dispatch(getPartnerCampaigns())
}

export const campaignListActions = {
  getCompanyCampaigns,
  getPartnerCampaigns,
  exportCompanyCampaigns,
  exportPartnerCampaigns,
  resetCampaignFilters,
  resetCompanyListParams,
  resetPartnerListParams,
  deleteCompanyCampaign,
  deletePartnerCampaign
}
