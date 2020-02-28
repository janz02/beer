import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Coupon } from 'models/coupon'
import { AppThunk } from 'app/store'
import { api } from 'api'
import moment from 'moment'
import { message } from 'antd'
import i18n from 'app/i18n'
import { CouponState } from 'api/swagger'

interface CouponEditorState {
  coupon?: Coupon
  error: string | null
  loading: boolean
}

const initialState: CouponEditorState = {
  error: null,
  loading: false
}

const couponViewSlice = createSlice({
  name: 'couponView',
  initialState,
  reducers: {
    getCouponsSuccess(state, action: PayloadAction<Coupon>) {
      state.coupon = action.payload

      state.loading = false
      state.error = null
    },
    setLoadingStart(state) {
      state.loading = true
    },
    setLoadingFailed(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    updateCouponStatusSuccess(state) {
      message.success(i18n.t('coupon-editor.save-coupon-status-success'), 10)
      state.loading = false
      state.error = null
    }
  }
})

export const {
  getCouponsSuccess,
  setLoadingStart,
  setLoadingFailed,
  updateCouponStatusSuccess
} = couponViewSlice.actions

export const couponViewReducer = couponViewSlice.reducer

export const getCoupon = (id: number): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    const coupon = await api.coupons.getCoupon({ id })

    dispatch(
      getCouponsSuccess({
        ...coupon,
        startDate: coupon.startDate && moment(coupon.startDate),
        endDate: coupon.endDate && moment(coupon.endDate),
        expireDate: coupon.expireDate && moment(coupon.expireDate)
      } as Coupon)
    )
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}

export const updateCouponStatus = (
  id: number,
  couponState: CouponState,
  comment: string
): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    await api.coupons.updateCouponStatus({
      id: id,
      changeCouponStateDto: { state: couponState, comment }
    })

    dispatch(updateCouponStatusSuccess())
    dispatch(getCoupon(id))
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}
