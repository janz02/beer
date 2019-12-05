import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from 'store/auth';

const rootReducer = combineReducers({ auth });

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
