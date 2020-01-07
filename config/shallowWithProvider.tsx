import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import * as redux from 'react-redux'

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