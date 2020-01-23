/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { CouponEditorForm } from './CouponEditorForm'
import { Card } from 'antd'
import { setupStore, setupUseParams } from '../../../../config/setupMocks'

import { shallow, mount } from 'enzyme'

describe('CouponEditorForm tests', () => {
  it('should not display button when not editing or not new', () => {
    // Arrange
    const props = {
      handleCouponSave: () => {
        /* no implementation */
      },
      loading: false,
      couponIsNew: false
    }

    setupStore({ coupons: { categories: [] } })
    setupUseParams({ editing: false })

    // Act
    const sut = mount(<CouponEditorForm {...props} />)

    // Assert
    expect(sut.find(Card)).toBeTruthy()
    expect(sut.props().couponIsNew).toEqual(false)
  })
})
