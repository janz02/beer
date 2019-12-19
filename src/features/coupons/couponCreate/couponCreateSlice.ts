import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coupon } from 'models/coupon';
import { AppThunk } from 'app/store';
import api from 'api';
import { message } from 'antd';
import { history } from 'app/router';
import i18n from 'app/i18n';

type CouponEditorState = {
  error: string | null;
  loading: boolean;
};

const initialState: CouponEditorState = {
  error: null,
  loading: false,
};

const couponCreateSlice = createSlice({
  name: 'couponCreate',
  initialState,
  reducers: {
    createCouponsSuccess(state) {
      message.success(i18n.t('couponCreate.createCouponSuccess'), 10);
      state.loading = false;
      state.error = null;
      history.push('/');
    },
    setLoadingStart(state) {
      state.loading = true;
    },
    setLoadingFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createCouponsSuccess,
  setLoadingStart,
  setLoadingFailed,
} = couponCreateSlice.actions;

export default couponCreateSlice.reducer;

export const createCoupons = (coupon: Coupon): AppThunk => async (dispatch) => {
  dispatch(setLoadingStart());

  try {
    await api.coupons.createCoupons({
      couponDto: {
        ...coupon,
        startDate: coupon.startDate && coupon.startDate.toDate(),
        endDate: coupon.endDate && coupon.endDate.toDate(),
        expireDate: coupon.expireDate && coupon.expireDate.toDate(),
      },
    });

    dispatch(createCouponsSuccess());
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()));
  }
};
