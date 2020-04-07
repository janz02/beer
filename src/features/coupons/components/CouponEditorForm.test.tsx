import React from 'react'
import { CouponEditorForm, CouponEditorFormProps } from './CouponEditorForm'
import { Card } from 'antd'
import { setupStore, setupUseParams } from '../../../../config/setupMocks'

import { shallow } from 'enzyme'

describe('CouponEditorForm tests', () => {
  it('should not display button when not editing or not new', () => {
    // Arrange
    const props: CouponEditorFormProps = {
      loading: false,
      couponIsNew: false,
      editing: false
    }
    setupStore({ coupons: { categories: [] } })
    setupUseParams({ editing: false })

    // Act
    const wrapper = shallow(<CouponEditorForm {...props} />)

    // Assert
  })
})
