import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CouponEditorForm from 'components/CouponEditorForm';
import { message } from 'antd';
import { history } from 'app/router';
import api from 'api';

const CouponCreatePage: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleCouponSave = async (values: any) => {
    setLoading(true);

    try {
      await api.coupons.createCoupons({
        couponDto: {
          name: values['name'],
          description: values['description'],
        },
      });

      message.success(t('couponCreate.createCouponSuccess'), 10);
      setLoading(false);
      history.push('/');
    } catch (err) {
      message.error(err.toString(), 10);
      setLoading(false);
    }
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
