/* eslint-disable @typescript-eslint/no-explicit-any */
import configureStore from 'redux-mock-store'
import * as ReactReduxHooks from '../src/hooks/react-redux-hooks'
import * as ReactRouterDomHooks from '../src/hooks/react-router-dom-hooks'
import thunk from 'redux-thunk'
import React from 'react'

/**
 * Use this, if you want to check whether a certain amount of sub-component is loaded
 * Eg. a foreach renders 4 Button
 *
 * This will not care about useEffect, and cannot push buttons
 * Optimal for simple logic checks
 * @param children The Component which it needs to be rendered
 * @param store An object, that represents the Redux store. Just simply pass an object, that the useSelector will query like: {auth: { loggedIn: true }}
 */
export const setupMocks = (store: {} = {}): void => {
  const mockStore = configureStore([thunk])(store)

  const useEffect = jest.spyOn(React, 'useEffect')
  useEffect.mockImplementationOnce((f: any) => f())

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  jest.spyOn(ReactReduxHooks, 'useSelector').mockImplementation(state => mockStore.getState())
  jest.spyOn(ReactReduxHooks, 'useDispatch').mockImplementation(() => mockStore.dispatch)
}

export const setupUseParams = (params: {} = {}): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  jest.spyOn(ReactRouterDomHooks, 'useParams').mockImplementation(() => params)
}
