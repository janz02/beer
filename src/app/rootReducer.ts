import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import couponsListReducer from 'features/couponsList/couponsListSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  couponsList: couponsListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
