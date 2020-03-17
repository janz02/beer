import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Coupon } from 'models/coupon'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { message } from 'antd'
import { history } from 'router/router'
import i18n from 'app/i18n'
import moment from 'moment'
import { CouponComment } from 'models/couponComment'

interface CouponEditorState {
  coupon?: Coupon
  error: string | null
  loading: boolean
}

const initialState: CouponEditorState = {
  error: null,
  loading: false
}

const couponEditorSlice = createSlice({
  name: 'couponEditor',
  initialState,
  reducers: {
    resetCouponEditor: () => initialState,
    getCouponSuccess(state, action: PayloadAction<Coupon>) {
      state.coupon = action.payload

      state.loading = false
      state.error = null
    },
    updateCouponSuccess(state) {
      message.success(i18n.t('coupon-editor.save-coupon-success'), 10)
      state.loading = false
      state.error = null
    },
    deleteCouponCommentsSuccess(state) {
      state.loading = false
      state.error = null
    },
    getCouponCommentsSuccess(state, action: PayloadAction<CouponComment[]>) {
      if (state.coupon) {
        state.coupon.comments = action.payload
      }
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

const {
  getCouponSuccess,
  updateCouponSuccess,
  deleteCouponCommentsSuccess,
  getCouponCommentsSuccess,
  setLoadingStart,
  setLoadingFailed
} = couponEditorSlice.actions

export const { resetCouponEditor } = couponEditorSlice.actions

export const couponEditorReducer = couponEditorSlice.reducer

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
    dispatch(setLoadingFailed(err.toString()))
  }
}

export const updateCoupon = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    const tags = await api.tags.getTags({})
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tagId = (tags && tags.result && tags.result[0].id!) || 0

    await api.coupons.updateCoupon({
      id: coupon.id!,
      couponDto: {
        ...coupon,
        startDate: coupon.startDate && coupon.startDate.toDate(),
        endDate: coupon.endDate && coupon.endDate.toDate(),
        expireDate: coupon.expireDate && coupon.expireDate.toDate(),
        // TODO fix this with tags
        tags: [tagId]
      }
    })

    dispatch(updateCouponSuccess())
    history.push('/coupons')
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}

export const getCouponComments = (couponId: number): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    const comments = await api.couponComments.getCouponComments({ couponId })

    dispatch(
      getCouponCommentsSuccess(
        comments.map(x => {
          return { ...x, dateTime: moment(x.dateTime) }
        })
      )
    )
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}

export const deleteCouponComment = (
  couponId: number,
  commentId: number
): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    await api.couponComments.deleteCouponComment({
      commentId,
      couponId
    })

    dispatch(deleteCouponCommentsSuccess())
    dispatch(getCouponComments(couponId))
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}
