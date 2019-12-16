import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CouponEditorForm from 'components/CouponEditorForm';
import { history } from 'app/router';
import { message } from 'antd';
import { Coupon } from 'models/coupon';
import moment from 'moment';

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
    category: 'c1',
    discountType: 'fix',
    discountAmount: 1500,
    distributionStartDate: moment(new Date()),
    distributionEndDate: moment(new Date()),
    expirationDate: moment(new Date()),
    couponCount: 100,
    minimumShoppingValue: 10000,
  };

  const props = {
    handleCouponSave,
    loading,
    coupon,
    couponIsNew: false,
  };

  return (
    <>
      <CouponEditorForm {...props} />
    </>
  );
};

export default CouponEditorPage;
