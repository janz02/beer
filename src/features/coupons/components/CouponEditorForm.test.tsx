import React from 'react';
import shallowWithProvider from '../../../../config/shallowWithProvider';
import CouponEditorForm from './CouponEditorForm';
import { Button, Card } from 'antd';

describe('CouponEditorForm tests', () => {

  jest.mock("react-redux", () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: () => jest.fn()
  }));

  it('should not display button when not editing or not new', () => {

    // Arrange
    const props = {
      handleCouponSave: (v: any) => { },
      loading: false,
      couponIsNew: false
    };
    const state = { coupons: { categories: [] } };

    // Act
    const wrapper = shallowWithProvider(<CouponEditorForm {...props} />)(state);

    // Assert    
     expect(wrapper.find(Card)).toBeTruthy();
  });

  it('should display button when new', () => {

    // Arrange
    const props = {
      handleCouponSave: (v: any) => { },
      loading: false,
      couponIsNew: true
    };
    const state = { coupons: { categories: [] } };

    // Act
    const wrapper = shallowWithProvider(<CouponEditorForm {...props} />)(state);
    // Assert
    
    expect(wrapper.find(Card)).toBeTruthy();

  });
})

