import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CouponCampaign } from 'models/couponCampaign'
import { AppThunk } from 'app/store'
import { api } from 'api'
import moment from 'moment'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'
import { downloadBlobAsCsv } from 'services/file-reader'

export enum CouponListTabKey {
  Waiting = 'waiting',
  Accepted = 'accepted',
  Closed = 'closed',
  Created = 'created',
  All = 'all'
}

interface CouponListState {
  coupons: CouponCampaign[]
  listParams: ListRequestParams
  allCouponsCount?: number
  includeArchived: boolean
  activeTabKey: CouponListTabKey
  campaignToDelete?: CouponCampaign
  deletePopupVisible: boolean
  featureState: FeatureState
}

const initialState: CouponListState = {
  coupons: [],
  listParams: {
    pageSize: 10
  },
  includeArchived: false,
  activeTabKey: CouponListTabKey.Waiting,
  deletePopupVisible: false,
  featureState: FeatureState.Initial
}

const couponCampaignListSlice = createSlice({
  name: 'couponCampaignList',
  initialState,
  reducers: {
    resetCampaignList: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    setFeatureState(state, action: PayloadAction<FeatureState>) {
      state.featureState = action.payload
    },
    getCouponsSuccess(
      state,
      action: PayloadAction<{ coupons: CouponCampaign[]; listParams: ListRequestParams }>
    ) {
      state.coupons = action.payload.coupons
      state.listParams = action.payload.listParams
      state.featureState = FeatureState.Success
    },
    deleteSuccess(state) {
      state.featureState = FeatureState.Success
    },
    setIncludeArchived(state, action: PayloadAction<boolean>) {
      state.includeArchived = action.payload
    },
    setActiveTabKey(state, action: PayloadAction<CouponListTabKey>) {
      state.activeTabKey = action.payload
      state.listParams.page = 1
    },
    prepareCampaignDelete(state, action: PayloadAction<CouponCampaign>) {
      state.campaignToDelete = action.payload
      state.deletePopupVisible = true
    },
    cancelCampaignDelete(state) {
      state.campaignToDelete = undefined
      state.deletePopupVisible = false
    }
  }
})

const {
  resetCampaignList,
  resetListParams,
  setFeatureState,
  getCouponsSuccess,
  deleteSuccess,
  setIncludeArchived,
  setActiveTabKey,
  prepareCampaignDelete,
  cancelCampaignDelete
} = couponCampaignListSlice.actions

const getCoupons = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setFeatureState(FeatureState.Loading))

    const { listParams, includeArchived, activeTabKey } = getState().couponCampaignList

    const revisedParams = reviseListRequestParams(listParams, params)

    revisedParams.includeArchived = includeArchived
    revisedParams.state = activeTabKey

    // This is an exception because the backcouponsApi needs it this way.
    if (revisedParams.orderBy === 'partnerName') {
      revisedParams.orderBy = 'partner.name'
    }

    const { result, ...pagination } = await api.coupon.coupons.getCoupons(revisedParams)

    // Reverting exception because the frontend needs it this way.
    if (revisedParams.orderBy === 'partner.name') {
      revisedParams.orderBy = 'partnerName'
    }

    const coupons =
      result?.map<CouponCampaign>(c => ({
        ...(c as any),
        startDate: moment(c.startDate),
        endDate: moment(c.endDate),
        expireDate: c.expireDate && moment(c.expireDate),
        drawDate: c.drawDate && moment(c.drawDate)
      })) ?? []

    dispatch(
      getCouponsSuccess({
        coupons,
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const resetCouponFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getCoupons())
}

const deleteCoupon = (id: number): AppThunk => async (dispatch, getState) => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    await api.coupon.coupons.deleteCoupon({ id })
    dispatch(deleteSuccess())
    const newPage = recalculatePaginationAfterDeletion(getState().couponCampaignList.listParams)
    dispatch(getCoupons({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
    return { id, error: err.toString() }
  }
}

const exportCoupons = (): AppThunk => async (dispatch, getState) => {
  const { listParams } = getState().couponCampaignList

  try {
    const file = await api.coupon.coupons.exportCoupons(listParams)
    downloadBlobAsCsv(file)
  } catch (err) {
    return { error: err.toString() }
  }
}

export const couponCampaignListActions = {
  resetCampaignList,
  setIncludeArchived,
  setActiveTabKey,
  prepareCampaignDelete,
  cancelCampaignDelete,
  getCoupons,
  resetCouponFilters,
  deleteCoupon,
  exportCoupons
}

export const couponCampaignListReducer = couponCampaignListSlice.reducer
