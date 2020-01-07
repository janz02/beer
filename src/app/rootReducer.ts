import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { history } from './router';
import routerHistoryReducer from './routerHistoryStore';
import authReducer from 'features/auth/authSlice';
import couponListReducer from 'features/coupons/couponList/couponListSlice';
import couponEditorReducer from 'features/coupons/couponEditor/couponEditorSlice';
import couponCreateReducer from 'features/coupons/couponCreate/couponCreateSlice';
import couponsReducer from 'features/coupons/couponsSlice';
import notificationReducer from 'features/notification/notificationSlice'

const rootReducer = combineReducers({
    router: connectRouter(history),
    routerHistory: routerHistoryReducer,
    auth: authReducer,
    couponList: couponListReducer,
    couponEditor: couponEditorReducer,
    couponCreate: couponCreateReducer,
    coupons: couponsReducer,
    notification: notificationReducer
  });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
