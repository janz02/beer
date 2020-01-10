import React, { useEffect } from 'react';
import CouponEditorForm from 'features/coupons/components/CouponEditorForm';
import { useParams } from 'react-router-dom';
import { RootState } from 'app/rootReducer';
import { useSelector, useDispatch } from 'hooks/react-redux-hooks';
import { getCoupons, updateCoupons } from './couponEditorSlice';
import { Coupon } from 'models/coupon';

const CouponEditorPage: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { coupon, loading } = useSelector(
    (state: RootState) => state.couponEditor,
  );

  useEffect(() => {
    dispatch(getCoupons(+id!));
  }, [id, dispatch]);

  const handleCouponSave = (coupon: Coupon) => {
    dispatch(
      updateCoupons({
        ...coupon,
        id: +id!,
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
