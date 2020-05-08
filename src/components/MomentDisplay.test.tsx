import React from 'react'
import { MomentDisplay } from './MomentDisplay'
import { shallow } from 'enzyme'
import moment from 'moment'
import { setMomentLocale } from 'app/i18n/moment-locale'

describe('MomentDisplay hu tests', () => {
  beforeAll(() => {
    setMomentLocale('hu')
  })

  it('should render a formatted date by default', () => {
    // Arrange
    const date = moment(new Date(2011, 9, 31, 10, 30))

    // Act
    const wrapper = shallow(<MomentDisplay date={date} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('2011.10.31.')
  })

  it('should render a formatted date and time when mode is date time', () => {
    // Arrange
    const date = moment(new Date(2011, 9, 31, 10, 30))
    const mode = 'date time'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('2011.10.31. 10:30')
  })

  it('should render a formatted date and time-sec when mode is date time', () => {
    // Arrange
    const date = moment(new Date(2011, 9, 31, 10, 30, 10))
    const mode = 'date time-sec'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('2011.10.31. 10:30:10')
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

    const divs = wrapper.find('div')
    const firstDivText = divs
      .children()
      .at(0)
      .text()
    const secondDivText = divs
      .children()
      .at(1)
      .text()

    // Assert
    expect(firstDivText).toEqual('2011.10.31.')
    expect(secondDivText).toEqual('10:30')
  })

  it('should render a the elapsed time as text when the mode is from now (1 minute = egy perce)', () => {
    // Arrange
    const span = moment.duration(1, 'minute')
    const date = moment(moment.now()).subtract(span)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('egy perce')
  })

  it('should render a the elapsed time as text when the mode is from now (2 minutes = 2 perce)', () => {
    // Arrange
    const span = moment.duration(2, 'minute')
    const date = moment(moment.now()).subtract(span)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('2 perce')
  })

  it('should render a the elapsed time as text when the mode is from now (1 hour = egy órája)', () => {
    // Arrange
    const span = moment.duration(1, 'hour')
    const date = moment(moment.now()).subtract(span)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('egy órája')
  })

  it('should render a the elapsed time as text when the mode is from now (1 hour 25 minutes = egy órája)', () => {
    // Arrange
    const spanHours = moment.duration(1, 'hour')
    const spanMinutes = moment.duration(25, 'minute')
    const date = moment(moment.now())
      .subtract(spanHours)
      .subtract(spanMinutes)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('egy órája')
  })

  it('should render a the elapsed time as text when the mode is from now (1 hour 75 minutes = 2 órája)', () => {
    // Arrange
    const spanHours = moment.duration(1, 'hour')
    const spanMinutes = moment.duration(75, 'minute')
    const date = moment(moment.now())
      .subtract(spanHours)
      .subtract(spanMinutes)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('2 órája')
  })

  it('should render a the elapsed time as text when the mode is from now (25 hours = egy napja)', () => {
    // Arrange
    const span = moment.duration(25, 'hour')
    const date = moment(moment.now()).subtract(span)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('egy napja')
  })

  it('should render a the elapsed time as text when the mode is from now (75 hours 3 minutes = 3 napja)', () => {
    // Arrange
    const spanHours = moment.duration(75, 'hour')
    const spanMinutes = moment.duration(3, 'minute')
    const date = moment(moment.now())
      .subtract(spanHours)
      .subtract(spanMinutes)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('3 napja')
  })

  it('should render a the elapsed time as text when the mode is from now (6 weeks 4 day = egy hónapja)', () => {
    // Arrange
    const spanWeeks = moment.duration(6, 'week')
    const spanDays = moment.duration(4, 'day')
    const date = moment(moment.now())
      .subtract(spanWeeks)
      .subtract(spanDays)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('egy hónapja')
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

describe('MomentDisplay en tests', () => {
  beforeAll(() => {
    setMomentLocale('en')
  })

  it('should render a formatted date by default', () => {
    // Arrange
    const date = moment(new Date(2011, 9, 31, 10, 30))

    // Act
    const wrapper = shallow(<MomentDisplay date={date} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('10/31/2011')
  })

  it('should render a formatted date and time when mode is date time', () => {
    // Arrange
    const date = moment(new Date(2011, 9, 31, 10, 30))
    const mode = 'date time'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('10/31/2011 10:30 AM')
  })

  it('should render a formatted date and time-sec when mode is date time', () => {
    // Arrange
    const date = moment(new Date(2011, 9, 31, 10, 30, 10))
    const mode = 'date time-sec'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('10/31/2011 10:30:10 AM')
  })

  it('should render a formatted time when mode is time', () => {
    // Arrange
    const date = moment(new Date(2011, 9, 31, 10, 30))
    const mode = 'time'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('10:30 AM')
  })

  it('should render a formatted date and time in divs when mode is date/time', () => {
    // Arrange
    const date = moment(new Date(2011, 9, 31, 10, 30))
    const mode = 'date/time'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    const divs = wrapper.find('div')
    const firstDivText = divs
      .children()
      .at(0)
      .text()
    const secondDivText = divs
      .children()
      .at(1)
      .text()

    // Assert
    expect(firstDivText).toEqual('10/31/2011')
    expect(secondDivText).toEqual('10:30 AM')
  })

  it('should render a the elapsed time as text when the mode is from now (1 minute = a minute ago)', () => {
    // Arrange
    const span = moment.duration(1, 'minute')
    const date = moment(moment.now()).subtract(span)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('a minute ago')
  })

  it('should render a the elapsed time as text when the mode is from now (2 minutes = 2 minutes ago)', () => {
    // Arrange
    const span = moment.duration(2, 'minute')
    const date = moment(moment.now()).subtract(span)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('2 minutes ago')
  })

  it('should render a the elapsed time as text when the mode is from now (1 hour = an hour ago)', () => {
    // Arrange
    const span = moment.duration(1, 'hour')
    const date = moment(moment.now()).subtract(span)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('an hour ago')
  })

  it('should render a the elapsed time as text when the mode is from now (1 hour 25 minutes = an hour ago)', () => {
    // Arrange
    const spanHours = moment.duration(1, 'hour')
    const spanMinutes = moment.duration(25, 'minute')
    const date = moment(moment.now())
      .subtract(spanHours)
      .subtract(spanMinutes)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('an hour ago')
  })

  it('should render a the elapsed time as text when the mode is from now (1 hour 75 minutes = 2 hours ago)', () => {
    // Arrange
    const spanHours = moment.duration(1, 'hour')
    const spanMinutes = moment.duration(75, 'minute')
    const date = moment(moment.now())
      .subtract(spanHours)
      .subtract(spanMinutes)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('2 hours ago')
  })

  it('should render a the elapsed time as text when the mode is from now (25 hours = a day ago)', () => {
    // Arrange
    const span = moment.duration(25, 'hour')
    const date = moment(moment.now()).subtract(span)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('a day ago')
  })

  it('should render a the elapsed time as text when the mode is from now (75 hours 3 minutes = 3 days ago)', () => {
    // Arrange
    const spanHours = moment.duration(75, 'hour')
    const spanMinutes = moment.duration(3, 'minute')
    const date = moment(moment.now())
      .subtract(spanHours)
      .subtract(spanMinutes)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('3 days ago')
  })

  it('should render a the elapsed time as text when the mode is from now (6 weeks 4 day = a month ago)', () => {
    // Arrange
    const spanWeeks = moment.duration(6, 'week')
    const spanDays = moment.duration(4, 'day')
    const date = moment(moment.now())
      .subtract(spanWeeks)
      .subtract(spanDays)
    const mode = 'from now'

    // Act
    const wrapper = shallow(<MomentDisplay date={date} mode={mode} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('a month ago')
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
