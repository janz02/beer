import configureStore from 'redux-mock-store'
import * as ReactReduxHooks from '../src/hooks/react-redux-hooks'
import * as ReactRouterDomHooks from '../src/hooks/react-router-dom-hooks'
import * as JwtReader from 'services/jwt-reader'
import thunk from 'redux-thunk'
import React from 'react'
import { Roles } from 'api/swagger/coupon'
import * as columnOrderHook from 'components/table-columns/useColumnOrder'

/**
 * Use this, if you want to check whether a certain amount of sub-component is loaded
 * Eg. a foreach renders 4 Button
 *
 * This will not care about useEffect, and cannot push buttons
 * Optimal for simple logic checks
 * @param children The Component which it needs to be rendered
 * @param store An object, that represents the Redux store. Just simply pass an object, that the useSelector will query like: {auth: { loggedIn: true }}
 */
export const setupStore = (store: {} = {}): void => {
  const mockStore = configureStore([thunk])(store)

  // Temp fix so useEffect hook is bypassed in tests
  jest
    .spyOn(columnOrderHook, 'useColumnOrder')
    .mockImplementation(
      defaultColumns =>
        ({ currentColumns: defaultColumns } as columnOrderHook.UseColumnOrderFeatures<any>)
    )

  jest.spyOn(React, 'useEffect').mockImplementationOnce(f => f())
  jest.spyOn(ReactReduxHooks, 'useSelector').mockImplementation(f => f(mockStore.getState()))
  jest.spyOn(ReactReduxHooks, 'useDispatch').mockImplementation(() => mockStore.dispatch)
}

export const setupUseParams = (params: {} = {}): void => {
  jest.spyOn(ReactRouterDomHooks, 'useParams').mockImplementation(() => params)
}

export const setupPermissions = (roles: Roles[]): void => {
  jest
    .spyOn(JwtReader, 'hasPermission')
    .mockImplementation(x => !!x && x.some(y => roles.includes(y)))
}
