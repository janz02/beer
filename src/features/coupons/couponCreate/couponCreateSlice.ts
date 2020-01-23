import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Coupon } from 'models/coupon'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { message } from 'antd'
import { history } from 'router/router'
import i18n from 'app/i18n'

interface CouponEditorState {
  error: string | null
  loading: boolean
}

const initialState: CouponEditorState = {
  error: null,
  loading: false
}

const couponCreateSlice = createSlice({
  name: 'coupon-create',
  initialState,
  reducers: {
    createCouponsSuccess(state) {
      message.success(i18n.t('coupon-create.create-coupon-success'), 10)
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

export const { createCouponsSuccess, setLoadingStart, setLoadingFailed } = couponCreateSlice.actions

export default couponCreateSlice.reducer

export const createCoupons = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    const tags = await api.tags.listTags({})
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tagId = (tags && tags.result && tags.result[0].id!) || 0

    await api.coupons.createCoupons({
      couponDto: {
        ...coupon,
        startDate: coupon.startDate && coupon.startDate.toDate(),
        endDate: coupon.endDate && coupon.endDate.toDate(),
        expireDate: coupon.expireDate && coupon.expireDate.toDate(),
        // TODO fix this with tags
        tags: [tagId],
        // TODO fix this with prize coupons
        isDrawable: true
      }
    })

    dispatch(createCouponsSuccess())
    history.push('/coupons')
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}
