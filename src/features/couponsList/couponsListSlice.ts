import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coupon } from 'models/coupon';
import { AppThunk } from 'app/store';
import api from 'api';

type CouponsListState = {
  coupons?: Coupon[];
  error: string | null;
  loading: boolean;
};

const initialState: CouponsListState = {
  coupons: [],
  error: null,
  loading: false,
};

const couponsListSlice = createSlice({
  name: 'couponsList',
  initialState,
  reducers: {
    getCouponsSuccess(state, action: PayloadAction<Coupon[]>) {
      state.coupons = action.payload;

      state.loading = false;
      state.error = null;
    },
    deleteCouponsSuccess(state, action: PayloadAction<string>) {
      state.coupons = state.coupons!.filter((x) => x.id !== +action.payload);

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
  getCouponsSuccess,
  deleteCouponsSuccess,
  setLoadingStart,
  setLoadingFailed,
} = couponsListSlice.actions;

export default couponsListSlice.reducer;

export const getCoupons = (): AppThunk => async (dispatch) => {
  dispatch(setLoadingStart());

  try {
    const coupons = await api.coupons.listCoupons({});
    dispatch(
      getCouponsSuccess(
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

export const deleteCoupons = (id: string): AppThunk => async (dispatch) => {
  dispatch(setLoadingStart());

  try {
    await api.coupons.deleteCoupons({ id2: id });
    dispatch(deleteCouponsSuccess(id));
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()));
  }
};
