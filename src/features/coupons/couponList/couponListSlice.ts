import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Coupon } from 'models/coupon'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { CouponListingOptions } from 'models/couponListingOptions'
import moment from 'moment'

interface CouponListState {
  coupons?: Coupon[]
  allCouponsCount?: number
  error: string | null
  loading: boolean
}

const initialState: CouponListState = {
  error: null,
  loading: false
}

const couponListSlice = createSlice({
  name: 'coupon-list',
  initialState,
  reducers: {
    listCouponsSuccess(
      state,
      action: PayloadAction<{ coupons?: Coupon[]; allCouponsCount: number }>
    ) {
      state.coupons = action.payload.coupons
      state.allCouponsCount = action.payload.allCouponsCount

      state.loading = false
      state.error = null
    },
    deleteCouponsSuccess(state, action: PayloadAction<number>) {
      state.coupons = state.coupons && state.coupons.filter(x => x.id !== action.payload)

      state.loading = false
      state.error = null
    },
    setLoadingStart(state) {
      state.loading = true
    },
    setLoadingFailed(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  listCouponsSuccess,
  deleteCouponsSuccess,
  setLoadingStart,
  setLoadingFailed
} = couponListSlice.actions

export default couponListSlice.reducer

export const getWaitingCoupons = (
  listingOptions: CouponListingOptions
): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    const response = await api.coupons.getWaitingCoupons({
      ...listingOptions,
      page: listingOptions.current
    })

    const coupons = response.result
      ? response.result.map(
          x =>
            ({
              ...x,
              startDate: moment(x.startDate),
              endDate: moment(x.endDate),
              expireDate: moment(x.expireDate)
            } as Coupon)
        )
      : undefined

    dispatch(
      listCouponsSuccess({
        coupons,
        allCouponsCount: response.size || 0
      })
    )
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}

export const deleteCoupons = (id: number): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    await api.coupons.deleteCoupons({ id: id })
    dispatch(deleteCouponsSuccess(id))
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}
