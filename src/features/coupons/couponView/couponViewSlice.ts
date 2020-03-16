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
  error: boolean
  loading: boolean
}

const initialState: CouponEditorState = {
  error: false,
  loading: false
}

const couponViewSlice = createSlice({
  name: 'couponView',
  initialState,
  reducers: {
    getCouponSuccess(state, action: PayloadAction<Coupon>) {
      state.coupon = action.payload

      state.loading = false
      state.error = false
    },
    setLoadingStart(state) {
      state.loading = true
    },
    setLoadingFailed(state) {
      state.loading = false
      state.error = true
    },
    updateCouponStatusSuccess(state) {
      message.success(i18n.t('coupon-editor.save-coupon-status-success'), 10)
      state.loading = false
      state.error = false
    }
  }
})

export const {
  getCouponSuccess,
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
      getCouponSuccess({
        ...coupon,
        startDate: coupon.startDate && moment(coupon.startDate),
        endDate: coupon.endDate && moment(coupon.endDate),
        expireDate: coupon.expireDate && moment(coupon.expireDate),
        comments: coupon.comments?.map(x => {
          return { ...x, dateTime: moment(x.dateTime) }
        })
      } as Coupon)
    )
  } catch (err) {
    dispatch(setLoadingFailed())
  }
}

export const updateCouponStatus = (
  id: number,
  couponState: CouponState,
  comment: string
): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    if (couponState) {
      await api.coupons.updateCouponStatus({
        id: id,
        changeCouponStateDto: {
          comment,
          state: couponState
        }
      })
    } else {
      await api.couponComments.addCouponComment({
        couponId: id,
        couponCommentDto: { comment: comment }
      })
    }

    dispatch(updateCouponStatusSuccess())
    dispatch(getCoupon(id))
  } catch (err) {
    dispatch(setLoadingFailed())
  }
}
