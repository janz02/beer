import { combineReducers } from '@reduxjs/toolkit';
import couponsListReducer from 'features/couponsList/couponsListSlice';
import authReducer from 'store/auth';

const rootReducer = combineReducers({
  auth: authReducer,
  couponsList: couponsListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
