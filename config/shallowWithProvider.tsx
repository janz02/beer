import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import * as redux from 'react-redux'

/**
 * Use this, if you want to check whether a certain amount of sub-component is loaded
 * Eg. a foreach renders 4 Button
 * 
 * This will not care about useEffect, and cannot push buttons 
 * Optimal for simple logic checks
 * @param children The Component which it needs to be rendered
 * @param store An object, that represents the Redux store. Just simply pass an object, that the useSelector will query like: {auth: { loggedIn: true }}
 */
const shallowWithProvider = (children: any) => (store: {} = {}) => { 
  
    const mockedStore = configureMockStore()(store);
  
    return shallow(
      <MemoryRouter>
        <redux.Provider store={mockedStore}>
          {children}
        </redux.Provider>
      </MemoryRouter>
    );
}

export default shallowWithProvider;

