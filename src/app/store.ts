import { configureStore, Action } from '@reduxjs/toolkit'
import { RootState, rootReducer } from './rootReducer'
import thunk, { ThunkAction } from 'redux-thunk'

export const store = configureStore({
  reducer: rootReducer,
  // To suppress "A non-serializable value was detected in an action, in the path" error caused by Date or moment: https://github.com/rt2zz/redux-persist/issues/988
  middleware: [thunk]
})

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  ;(module as any).hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
