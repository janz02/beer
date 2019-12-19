import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authenticator/authSlice';
import couponListReducer from 'features/coupons/couponList/couponListSlice';
import couponEditorReducer from 'features/coupons/couponEditor/couponEditorSlice';
import couponCreateReducer from 'features/coupons/couponCreate/couponCreateSlice';
import couponsReducer from 'features/coupons/couponsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  couponList: couponListReducer,
  couponEditor: couponEditorReducer,
  couponCreate: couponCreateReducer,
  coupons: couponsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
