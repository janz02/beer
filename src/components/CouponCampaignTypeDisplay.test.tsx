import React from 'react'
import { render } from 'enzyme'
import { CouponCampaignTypeDisplay } from './CouponCampaignTypeDisplay'
import { CouponType } from 'api/swagger/coupon'

describe('CouponCampaignTypeDisplay tests', () => {
  it('should show banner icon', () => {
    // Arrange
    const type = CouponType.Banner

    // Act
    const wrapper = render(<CouponCampaignTypeDisplay type={type} />)

    // Assert
    const icon = wrapper.text()
    expect(icon).toEqual('ic_type_banner.svg')
  })

  it('should show prize icon', () => {
    // Arrange
    const type = CouponType.Prize

    // Act
    const wrapper = render(<CouponCampaignTypeDisplay type={type} />)

    // Assert
    const icon = wrapper.text()
    expect(icon).toEqual('ic_type_prize.svg')
  })

  it('should show discount icon', () => {
    // Arrange
    const type = CouponType.Discount

    // Act
    const wrapper = render(<CouponCampaignTypeDisplay type={type} />)

    // Assert
    const icon = wrapper.text()
    expect(icon).toEqual('ic_type_discount.svg')
  })
})
