/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { CouponEditorForm } from './CouponEditorForm'
import { Card } from 'antd'
import configureStore from 'redux-mock-store'
import * as ReactReduxHooks from 'hooks/react-redux-hooks'
import * as ReactRouterDom from 'react-router-dom'

import thunk from 'redux-thunk'
import { shallow } from 'enzyme'

describe('CouponEditorForm tests', () => {
  let useEffect: any
  let store: any

  const mockUseEffect = (): any => {
    useEffect.mockImplementationOnce((f: any) => f())
  }

  beforeEach(() => {
    store = configureStore([thunk])({ coupons: { categories: [] } })

    useEffect = jest.spyOn(React, 'useEffect')
    mockUseEffect()

    jest.spyOn(ReactReduxHooks, 'useSelector').mockImplementation(state => store.getState())

    jest.spyOn(ReactReduxHooks, 'useDispatch').mockImplementation(() => store.dispatch)
  })

  it('should not display button when not editing or not new', () => {
    // Arrange
    const props = {
      handleCouponSave: (v: any) => {
        /* no implementation */
      },
      loading: false,
      couponIsNew: false
    }
    const state = { coupons: { categories: [] } }

    // // Act
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
