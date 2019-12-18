import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import couponsListReducer from 'features/couponsList/couponsListSlice';
import couponEditorReducer from 'features/couponEditor/couponEditorSlice';
import couponCreateReducer from 'features/couponCreate/couponCreateSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  couponsList: couponsListReducer,
  couponEditor: couponEditorReducer,
  couponCreate: couponCreateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
