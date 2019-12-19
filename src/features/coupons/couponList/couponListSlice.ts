import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coupon } from 'models/coupon';
import { AppThunk } from 'app/store';
import api from 'api';

type couponListState = {
  coupons?: Coupon[];
  error: string | null;
  loading: boolean;
};

const initialState: couponListState = {
  error: null,
  loading: false,
};

const couponListSlice = createSlice({
  name: 'couponList',
  initialState,
  reducers: {
    listCouponsSuccess(state, action: PayloadAction<Coupon[]>) {
      state.coupons = action.payload;

      state.loading = false;
      state.error = null;
    },
    deleteCouponsSuccess(state, action: PayloadAction<number>) {
      state.coupons = state.coupons!.filter((x) => x.id !== action.payload);

      state.loading = false;
      state.error = null;
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
  listCouponsSuccess,
  deleteCouponsSuccess,
  setLoadingStart,
  setLoadingFailed,
} = couponListSlice.actions;

export default couponListSlice.reducer;

export const listCoupons = (): AppThunk => async (dispatch) => {
  dispatch(setLoadingStart());

  try {
    const coupons = await api.coupons.listCoupons({});
    dispatch(
      listCouponsSuccess(
        coupons.result!.map(
          (x) =>
            ({ id: x.id, name: x.name, description: x.description } as Coupon),
        ),
      ),
    );
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()));
  }
};

export const deleteCoupons = (id: number): AppThunk => async (dispatch) => {
  dispatch(setLoadingStart());

  try {
    await api.coupons.deleteCoupons({ id: id });
    dispatch(deleteCouponsSuccess(id));
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()));
  }
};
