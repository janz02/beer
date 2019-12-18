import React, { useEffect } from 'react';
import CouponEditorForm from 'components/CouponEditorForm';
import { useParams } from 'react-router-dom';
import { RootState } from 'app/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { getCoupons, updateCoupons } from './couponEditorSlice';

const CouponEditorPage: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { coupon, loading } = useSelector(
    (state: RootState) => state.couponEditor,
  );

  useEffect(() => {
    dispatch(getCoupons(id!));
  }, [id, dispatch]);

  const handleCouponSave = (values: any) => {
    dispatch(
      updateCoupons({
        id: +id!,
        name: values['name'],
        description: values['description'],
      }),
    );
  };

  const props = {
    handleCouponSave,
    loading,
    couponIsNew: false,
    coupon,
  };

  return (
    <>
      <CouponEditorForm {...props} />
    </>
  );
};

export default CouponEditorPage;
