import React from 'react'
import { render } from 'enzyme'
import { CampaignStateDisplay } from './CampaignStateDisplay'
import { CouponState } from 'api/swagger/coupon'

describe('CampaignStateDisplay tests', () => {
  it('should render accepted state', () => {
    // Arrange
    const state = CouponState.Accepted

    // Act
    const wrapper = render(<CampaignStateDisplay state={state} />)

    // Assert
    const display = wrapper.text()
    expect(display).toEqual('coupon.state.accepted')
  })

  it('should render archived state', () => {
    // Arrange
    const state = CouponState.Archived

    // Act
    const wrapper = render(<CampaignStateDisplay state={state} />)

    // Assert
    const display = wrapper.text()
    expect(display).toEqual('coupon.state.archived')
  })

  it('should render closed state', () => {
    // Arrange
    const state = CouponState.Closed

    // Act
    const wrapper = render(<CampaignStateDisplay state={state} />)

    // Assert
    const display = wrapper.text()
    expect(display).toEqual('coupon.state.closed')
  })

  it('should render created state', () => {
    // Arrange
    const state = CouponState.Created

    // Act
    const wrapper = render(<CampaignStateDisplay state={state} />)

    // Assert
    const display = wrapper.text()
    expect(display).toEqual('coupon.state.created')
  })

  it('should render waiting state', () => {
    // Arrange
    const state = CouponState.Waiting

    // Act
    const wrapper = render(<CampaignStateDisplay state={state} />)

    // Assert
    const display = wrapper.text()
    expect(display).toEqual('coupon.state.waiting')
  })
})
