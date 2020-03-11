import React from 'react'
import { MomentDisplay } from './MomentDisplay'
import { shallow } from 'enzyme'
import moment from 'moment'

describe('MomentDisplay tests', () => {
  it('should render a formatted date by default', () => {
    // Arrange
    const date = moment(new Date(2011, 9, 31, 10, 30))

    // Act
    const wrapper = shallow(<MomentDisplay date={date} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('2011.10.31')
  })

  it('should render a formatted date and time when mode is date time', () => {
    // Arrange
    const date = moment(new Date(2011, 9, 31, 10, 30))
    const mode = 'date time'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('2011.10.31 10:30')
  })

  it('should render a formatted time when mode is time', () => {
    // Arrange
    const date = moment(new Date(2011, 9, 31, 10, 30))
    const mode = 'time'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('10:30')
  })

  it('should render a formatted date and time in divs when mode is date/time', () => {
    // Arrange
    const date = moment(new Date(2011, 9, 31, 10, 30))
    const mode = 'date/time'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('2011.10.3110:30')
  })

  it('should render nothing when props is empty', () => {
    // Arrange

    // Act
    const wrapper = shallow(<MomentDisplay />)

    // Assert
    expect(wrapper.text()).toEqual('')
    expect(wrapper).toMatchObject({})
  })
})
