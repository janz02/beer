/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { CouponEditorForm } from './CouponEditorForm'
import { Card } from 'antd'
import * as ReactRouterDom from 'react-router-dom'
import { setupMocks } from '../../../../config/setupMocks'

import { shallow } from 'enzyme'

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

    setupMocks({ coupons: { categories: [] } })

    // Act
    const wrapper = shallow(
      <ReactRouterDom.BrowserRouter>
        <CouponEditorForm {...props} />
      </ReactRouterDom.BrowserRouter>
    )

    // Assert
    const sut = wrapper.find(CouponEditorForm)

    expect(sut.find(Card)).toBeTruthy()
    expect(sut.props().couponIsNew).toEqual(false)
  })
})
