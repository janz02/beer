import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';

const rootReducer = combineReducers({ auth: authReducer });

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
