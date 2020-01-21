import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { history } from '../router/router'
import { routerHistoryStore } from '../router/routerHistoryStore'
import authReducer from 'features/auth/authSlice'
import couponListReducer from 'features/coupons/couponList/couponListSlice'
import couponEditorReducer from 'features/coupons/couponEditor/couponEditorSlice'
import couponCreateReducer from 'features/coupons/couponCreate/couponCreateSlice'
import couponsReducer from 'features/coupons/couponsSlice'
import notificationReducer from 'features/notification/notificationSlice'
import categoryListReducer from 'features/coupon-category/categoryList/categoryListSlice'
import categoryEditorReducer from 'features/coupon-category/categoryEditor/categoryEditorSlice'

export const rootReducer = combineReducers({
  router: connectRouter(history),
  routerHistory: routerHistoryStore,
  auth: authReducer,
  couponList: couponListReducer,
  couponEditor: couponEditorReducer,
  couponCreate: couponCreateReducer,
  coupons: couponsReducer,
  categoryList: categoryListReducer,
  categoryEditor: categoryEditorReducer,
  notification: notificationReducer
})

export type RootState = ReturnType<typeof rootReducer>
