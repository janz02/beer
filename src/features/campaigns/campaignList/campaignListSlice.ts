import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Coupon } from 'models/coupon'
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

export enum CouponListTabKey {
  Waiting = 'waiting',
  Accepted = 'accepted',
  Closed = 'closed',
  Created = 'created',
  All = 'all'
}

interface CouponListState {
  coupons: Coupon[]
  listParams: ListRequestParams
  allCouponsCount?: number
  includeArchived: boolean
  activeTabKey: CouponListTabKey
  campaignToDelete?: Coupon
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

const campaignListSlice = createSlice({
  name: 'campaignList',
  initialState,
  reducers: {
    resetCampaignList: () => initialState,
    setFeatureState(state, action: PayloadAction<FeatureState>) {
      state.featureState = action.payload
    },
    getCouponsSuccess(
      state,
      action: PayloadAction<{ coupons: Coupon[]; listParams: ListRequestParams }>
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
    prepareCampaignDelete(state, action: PayloadAction<Coupon>) {
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
  setFeatureState,
  getCouponsSuccess,
  deleteSuccess,
  setIncludeArchived,
  setActiveTabKey,
  prepareCampaignDelete,
  cancelCampaignDelete
} = campaignListSlice.actions

const getCoupons = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setFeatureState(FeatureState.Loading))

    const { listParams, includeArchived, activeTabKey } = getState().campaignList

    const revisedParams = reviseListRequestParams(listParams, params)

    revisedParams.includeArchived = includeArchived
    revisedParams.state = activeTabKey

    // This is an exception because the backcouponsApi needs it this way.
    if (revisedParams.orderBy === 'partnerName') {
      revisedParams.orderBy = 'partner.name'
    }

    const { result, ...pagination } = await api.coupons.getCoupons(revisedParams)

    // Reverting exception because the frontend needs it this way.
    if (revisedParams.orderBy === 'partner.name') {
      revisedParams.orderBy = 'partnerName'
    }

    const coupons =
      result?.map<Coupon>(c => ({
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
const deleteCoupon = (id: number): AppThunk => async (dispatch, getState) => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    await api.coupons.deleteCoupon({ id })
    dispatch(deleteSuccess())
    const newPage = recalculatePaginationAfterDeletion(getState().campaignList.listParams)
    dispatch(getCoupons({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
    return { id, error: err.toString() }
  }
}

export const campaignListActions = {
  resetCampaignList,
  setIncludeArchived,
  setActiveTabKey,
  prepareCampaignDelete,
  cancelCampaignDelete,
  getCoupons,
  deleteCoupon
}

export const campaignListReducer = campaignListSlice.reducer
