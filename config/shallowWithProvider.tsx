import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import * as redux from 'react-redux'

/**
 * Use this, if you want to check whether a certain amount of sub-component is loaded
 * Eg. a foreach renders 4 Button
 * 
 * This will not care about useEffect, and you cannot verify props, cannot push buttons 
 * Optimal for simple logic checks
 * @param children The Component which it needs to be rendered
 */
export const shallowWithProvider = (children: any) => (store: {} = {}) => { 
  
    const mockedStore = configureMockStore()(store);
  
    return shallow(
      <MemoryRouter>
        <redux.Provider store={mockedStore}>
          {children}
        </redux.Provider>
      </MemoryRouter>
    );
}

/**
 * Use this, if you want to simulate events, or fully render the component with all life cycle 
 * Eg. there are certain calls in useEffect, and want to read the props which are populated by a HOC
 * 
 * @param children The Component which it needs to be fully rendered
 */
export const mountWithProvider = (children: any) => (store: {} = {}) => { 
  
  const mockedStore = configureMockStore()(store);

  return mount(
    <MemoryRouter>
      <redux.Provider store={mockedStore}>
        {children}
      </redux.Provider>
    </MemoryRouter>
  );
}
