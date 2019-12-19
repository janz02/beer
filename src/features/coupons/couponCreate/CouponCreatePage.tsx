import React from 'react';
import CouponEditorForm from 'features/coupons/components/CouponEditorForm';
import { RootState } from 'app/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { createCoupons } from './couponCreateSlice';

const CouponCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.couponCreate);

  const handleCouponSave = (values: any) => {
    dispatch(
      createCoupons({
        name: values['name'],
        description: values['description'],
      }),
    );
  };

  const props = {
    handleCouponSave,
    loading,
    couponIsNew: true,
  };

  return (
    <>
      <CouponEditorForm {...props} />
    </>
  );
};

export default CouponCreatePage;
