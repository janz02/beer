import configureStore from 'redux-mock-store'
import * as ReactReduxHooks from '../src/hooks/react-redux-hooks'
import * as ReactRouterDomHooks from '../src/hooks/react-router-dom-hooks'
import * as JwtReader from 'services/jwt-reader'
import thunk from 'redux-thunk'
import { Roles } from 'api/swagger/coupon'

/**
 * Use this, to setup a mock store
 * @param store An object, that represents the Redux store. Just simply pass an object, that the useSelector will query like: {auth: { loggedIn: true }}
 */
export const setupStore = (store: {} = {}): void => {
  const mockStore = configureStore([thunk])(store)

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
