import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Coupon } from 'models/coupon'
import { AppThunk } from 'app/store'
import { api } from 'api'
import moment from 'moment'
import {
  ListRequestParams,
  Pagination,
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'

interface CouponListState {
  coupons: Coupon[]
  pagination: ListRequestParams
  allCouponsCount?: number
  error: string | null
  loading: boolean
}

const initialState: CouponListState = {
  coupons: [],
  pagination: {
    pageSize: 10
  },
  error: null,
  loading: false
}

const couponListSlice = createSlice({
  name: 'couponList',
  initialState,
  reducers: {
    resetCouponList: () => initialState,
    getCouponsRequest(state) {
      state.loading = true
    },
    getCouponsSuccess(state, action: PayloadAction<{ coupons: Coupon[]; pagination: Pagination }>) {
      state.coupons = action.payload.coupons
      state.pagination = action.payload.pagination
      state.loading = false
      state.error = ''
    },
    getCouponsFail(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    deleteRequest(state) {
      state.loading = true
    },
    deleteSuccess(state) {
      state.loading = false
    },
    deleteFail(state, action: PayloadAction<string>) {
      state.loading = false
    }
  }
})

const {
  getCouponsRequest,
  getCouponsSuccess,
  getCouponsFail,
  deleteRequest,
  deleteSuccess,
  deleteFail
} = couponListSlice.actions

export const { resetCouponList } = couponListSlice.actions

export const couponListReducer = couponListSlice.reducer

export const getWaitingCoupons = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getCouponsRequest())
    const revisedParams = reviseListRequestParams(getState().couponList.pagination, params)
    const { result, ...pagination } = await api.coupons.getWaitingCoupons(revisedParams)

    const coupons =
      result?.map<Coupon>(c => ({
        ...(c as any),
        startDate: moment(c.startDate),
        endDate: moment(c.endDate),
        expireDate: moment(c.expireDate)
      })) ?? []

    dispatch(
      getCouponsSuccess({
        coupons,
        pagination: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(getCouponsFail(err.toString()))
  }
}

export const deleteCoupon = (id: number): AppThunk => async (dispatch, getState) => {
  dispatch(deleteRequest())
  try {
    await await api.coupons.deleteCoupon({ id })
    dispatch(deleteSuccess())
    const newPage = recalculatePaginationAfterDeletion(getState().couponList.pagination)
    dispatch(getWaitingCoupons({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(deleteFail(err.toString()))
    return { id, error: err.toString() }
  }
}
