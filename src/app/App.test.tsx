import React from 'react'
import { App } from 'app/App'
import { shallow } from 'enzyme'

describe('App tests', () => {
  it('should render without crashing', () => {
    // Arrange

    // Act
    const wrapper = shallow(<App />)

    // Assert
    expect(wrapper).toBeTruthy()
  })
})
