import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import * as redux from 'react-redux'

/**
 * Use this, if you want to simulate events, or fully render the component with all life cycle 
 * Eg. there are certain calls in useEffect, and verify events
 * 
 * @param children The Component which it needs to be fully rendered
 * @param store An object, that represents the Redux store. Just simply pass an object, that the useSelector will query like: {auth: { loggedIn: true }}
 */
const mountWithProvider = (children: any) => (store: {} = {}) => { 
  
  const mockedStore = configureMockStore()(store);

  return mount(
    <MemoryRouter>
      <redux.Provider store={mockedStore}>
        {children}
      </redux.Provider>
    </MemoryRouter>
  );
}

export default mountWithProvider;