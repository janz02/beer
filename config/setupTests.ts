import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

React.useLayoutEffect = React.useEffect

configure({ adapter: new Adapter() })

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})
