import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CouponEditorForm from 'components/CouponEditorForm';
import { history } from 'app/router';
import { message } from 'antd';
import { Coupon } from 'models/coupon';
import api from 'api';
import { useParams } from 'react-router-dom';

const CouponEditorPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState<Coupon>();

  const handleCouponSave = async (values: any) => {
    setLoading(true);

    try {
      await api.coupons.updateCoupons({
        id2: id!,
        couponDto: {
          name: values['name'],
          description: values['description'],
        },
      });

      message.success(t('couponEditor.saveCouponSuccess'), 10);
      setLoading(false);
      history.push('/');
    } catch (err) {
      message.error(err.toString(), 10);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCoupon = async () => {
      try {
        const coupon = await api.coupons.getCoupons({ id: +id! });
        setCoupon({
          id: coupon.id,
          name: coupon.name,
          description: coupon.description,
        } as Coupon);

        setLoading(false);
      } catch (err) {
        message.error(err.toString(), 10);
        setLoading(false);
      }
    };

    setLoading(true);

    getCoupon();
  }, [id]);

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
