import React from 'react';
import shallowWithProvider from '../../../../config/shallowWithProvider';
import CouponEditorForm from './CouponEditorForm';
import { Card } from 'antd';

describe('CouponEditorForm tests', () => {

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
    const sut = wrapper.find(CouponEditorForm);
    expect(sut.find(Card)).toBeTruthy();
    expect(sut.props().couponIsNew).toEqual(false);
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
    const sut = wrapper.find(CouponEditorForm);
    expect(sut.find(Card)).toBeTruthy();
    expect(sut.props().couponIsNew).toEqual(true);

  });
})

