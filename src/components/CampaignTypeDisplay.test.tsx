import React from 'react'
import { render } from 'enzyme'
import { CampaignTypeDisplay } from './CampaignTypeDisplay'
import { CouponType } from 'api/swagger/coupon'

describe('CampaignTypeDisplay tests', () => {
  it('should show banner icon', () => {
    // Arrange
    const type: CouponType = CouponType.Banner

    // Act
    const wrapper = render(<CampaignTypeDisplay type={type} />)

    // Assert
    const icon = wrapper.text()
    expect(icon).toEqual('ic_type_banner.svg')
  })

  it('should show prize icon', () => {
    // Arrange
    const type: CouponType = CouponType.Prize

    // Act
    const wrapper = render(<CampaignTypeDisplay type={type} />)

    // Assert
    const icon = wrapper.text()
    expect(icon).toEqual('ic_type_prize.svg')
  })

  it('should show discount icon', () => {
    // Arrange
    const type: CouponType = CouponType.Discount

    // Act
    const wrapper = render(<CampaignTypeDisplay type={type} />)

    // Assert
    const icon = wrapper.text()
    expect(icon).toEqual('ic_type_discount.svg')
  })
})
