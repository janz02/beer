import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { CampaignListItem } from 'models/campaign/campaignListItem'
import moment from 'moment'
import { CampaignStatus } from 'models/campaign/campaignStatus'
import { Product } from 'models/campaign/product'
import { ChannelVm, GetManyProductsRequest } from 'api/swagger/campaign-editor'

export type CampaignListTab = 'company' | 'partner'

interface CampaignListState {
  companyCampaigns: CampaignListItem[]
  partnerCampaigns: CampaignListItem[]
  products: Product[]
  channels: ChannelVm[]
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
  products: [],
  channels: [],
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
      state.companyListParams = initialState.companyListParams
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
    getProducts(state, action: PayloadAction<{ products: Product[] }>) {
      state.products = action.payload.products
    },
    getChannels(state, action: PayloadAction<{ channels: ChannelVm[] }>) {
      state.channels = action.payload.channels
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
  getProducts,
  getChannels,
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
    const fixedRevisedParams = { ...revisedParams, status: revisedParams.statusId }

    const { items, ...pagination } = await api.campaignEditor.campaigns.getCampaigns(
      fixedRevisedParams
    )
    const campaigns =
      items?.map<CampaignListItem>(campaign => ({
        ...(campaign as CampaignListItem),
        startDate: moment(campaign.startDate),
        endDate: moment(campaign.endDate),
        createdDate: moment(campaign.createdDate),
        modifiedDate: moment(campaign.modifiedDate),
        status: campaign.statusId
          ? ('campaign-status.' + CampaignStatus[campaign.statusId]).toString().toLowerCase()
          : null
      })) ?? []

    if (!getState().campaignList.products) {
      const products = (await api.campaignEditor.products.getProducts({
        pageSize: -1
      })) as Product[]
      dispatch(getProducts({ products }))
    }

    if (!getState().campaignList.channels) {
      const channelsResponse = await api.campaignEditor.channels.getChannels({ pageSize: -1 })
      if (channelsResponse.items && channelsResponse.items.length > 0) {
        dispatch(getChannels({ channels: channelsResponse.items }))
      }
    }

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

const resetCompanyCampaignFilters = (): AppThunk => async dispatch => {
  dispatch(resetCompanyListParams())
  dispatch(getCompanyCampaigns())
}

const resetPartnerCampaignFilters = (): AppThunk => async dispatch => {
  dispatch(resetPartnerListParams())
  dispatch(getPartnerCampaigns())
}

export const campaignListActions = {
  resetCampaignsList,
  getCompanyCampaigns,
  getPartnerCampaigns,
  exportCompanyCampaigns,
  exportPartnerCampaigns,
  resetCompanyCampaignFilters,
  resetPartnerCampaignFilters,
  deleteCompanyCampaign,
  deletePartnerCampaign
}
