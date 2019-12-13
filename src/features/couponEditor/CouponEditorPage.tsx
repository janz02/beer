import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CouponEditorForm from 'components/CouponEditorForm';
import { history } from 'app/router';
import { message } from 'antd';
import { Coupon } from 'models/coupon';

const CouponEditorPage: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleCouponSave = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      // TODO: integrate API.
      console.log(values);

      message.success(t('couponEditor.saveCouponSuccess'), 10);
      setLoading(false);
      history.push('/');
    }, 2000);
  };

  // TODO: integrate API.
  const coupon: Coupon = {
    id: 1,
    name: 'Coupon 1',
    description: 'Decription of coupon 1',
    rank: 'standard',
    discountType: 'fix',
  };

  const props = {
    handleCouponSave,
    loading,
    coupon,
  };

  return (
    <>
      <CouponEditorForm {...props} />
    </>
  );
};

export default CouponEditorPage;
