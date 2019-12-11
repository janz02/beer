import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coupon } from 'models/coupon';

type CouponsListState = {
  coupons?: Coupon[];
};

let initialState: CouponsListState = {
  // TODO: remove mock data.
  coupons: [
    { name: 'Coupon 1', description: 'Description of coupon 1' },
    { name: 'Coupon 2', description: 'Description of coupon 2' },
  ],
};

const couponsListSlice = createSlice({
  name: 'couponsList',
  initialState,
  reducers: {
    setCoupons(state, action: PayloadAction<Coupon[]>) {
      state.coupons = action.payload;
    },
  },
});

export const { setCoupons } = couponsListSlice.actions;

export default couponsListSlice.reducer;
