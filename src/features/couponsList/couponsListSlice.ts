import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coupon } from 'models/coupon';

type CouponsListState = {
  coupons?: Coupon[];
};

let initialState: CouponsListState = {
  // TODO: remove mock data.
  coupons: Array(100)
    .fill(0)
    .map((e, i) => i + 1)
    .map((x) => {
      return {
        id: x,
        name: `Coupon ${x}`,
        description: `Description of coupon ${x}`,
      } as Coupon;
    }),
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
