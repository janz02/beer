import React from 'react'
import { shallow } from 'enzyme'
import { CampaignActiveDisplay } from './CampaignActiveDisplay'
import { Coupon } from 'models/coupon'

describe('CampaignActiveDisplay tests', () => {
  it('should render inactive when partner is inactive', () => {
    // Arrange
    const coupon: Coupon = { isPartnerActive: false, isActive: true }

    // Act
    const wrapper = shallow(<CampaignActiveDisplay coupon={coupon} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('coupon.status.inactive')
  })

  it('should render inactive when partner is active and campaign is inactive', () => {
    // Arrange
    const coupon: Coupon = { isPartnerActive: true, isActive: false }

    // Act
    const wrapper = shallow(<CampaignActiveDisplay coupon={coupon} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('coupon.status.inactive')
  })

  it('should render active when partner is active and campaign is active', () => {
    // Arrange
    const coupon: Coupon = { isPartnerActive: true, isActive: true }

    // Act
    const wrapper = shallow(<CampaignActiveDisplay coupon={coupon} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('coupon.status.active')
  })

  it('should render nothing when props is empty', () => {
    // Arrange

    // Act
    const wrapper = shallow(<CampaignActiveDisplay />)

    // Assert
    expect(wrapper.text()).toEqual('')
    expect(wrapper).toMatchObject({})
  })
})
