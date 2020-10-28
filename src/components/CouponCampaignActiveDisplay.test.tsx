import React from 'react'
import { shallow } from 'enzyme'
import { CouponCampaignActiveDisplay } from './CouponCampaignActiveDisplay'
import { CouponCampaign } from 'models/couponCampaign'

describe('CouponCampaignActiveDisplay tests', () => {
  it('should render inactive when partner is inactive', () => {
    // Arrange
    const coupon: CouponCampaign = { isPartnerActive: false, isActive: true }

    // Act
    const wrapper = shallow(<CouponCampaignActiveDisplay coupon={coupon} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('coupon.status.inactive')
  })

  it('should render inactive when partner is active and campaign is inactive', () => {
    // Arrange
    const coupon: CouponCampaign = { isPartnerActive: true, isActive: false }

    // Act
    const wrapper = shallow(<CouponCampaignActiveDisplay coupon={coupon} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('coupon.status.inactive')
  })

  it('should render active when partner is active and campaign is active', () => {
    // Arrange
    const coupon: CouponCampaign = { isPartnerActive: true, isActive: true }

    // Act
    const wrapper = shallow(<CouponCampaignActiveDisplay coupon={coupon} />)

    // Assert
    const text = wrapper.text()
    expect(text).toEqual('coupon.status.active')
  })

  it('should render nothing when props is empty', () => {
    // Arrange

    // Act
    const wrapper = shallow(<CouponCampaignActiveDisplay />)

    // Assert
    expect(wrapper.text()).toEqual('')
    expect(wrapper).toMatchObject({})
  })
})
