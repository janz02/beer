import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coupon } from 'models/coupon';
import { AppThunk } from 'app/store';
import api from 'api';
import { message } from 'antd';
import { history } from 'app/router';
import i18n from 'app/i18n';

type CouponEditorState = {
  coupon?: Coupon;
  error: string | null;
  loading: boolean;
};

const initialState: CouponEditorState = {
  error: null,
  loading: false,
};

const couponEditorSlice = createSlice({
  name: 'couponEditor',
  initialState,
  reducers: {
    getCouponsSuccess(state, action: PayloadAction<Coupon>) {
      state.coupon = action.payload;

      state.loading = false;
      state.error = null;
    },
    updateCouponsSuccess(state) {
      message.success(i18n.t('couponEditor.saveCouponSuccess'), 10);
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
  getCouponsSuccess,
  updateCouponsSuccess,
  setLoadingStart,
  setLoadingFailed,
} = couponEditorSlice.actions;

export default couponEditorSlice.reducer;

export const getCoupons = (id: string): AppThunk => async (dispatch) => {
  dispatch(setLoadingStart());

  try {
    const coupon = await api.coupons.getCoupons({ id: +id });
    dispatch(
      getCouponsSuccess({
        id: coupon.id,
        name: coupon.name,
        description: coupon.description,
      } as Coupon),
    );
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()));
  }
};

export const updateCoupons = (coupon: Coupon): AppThunk => async (dispatch) => {
  dispatch(setLoadingStart());

  try {
    await api.coupons.updateCoupons({
      id2: coupon.id!.toString(),
      couponDto: coupon,
    });

    dispatch(updateCouponsSuccess());
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()));
  }
};
