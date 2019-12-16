import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CouponEditorForm from 'components/CouponEditorForm';
import { message } from 'antd';
import { history } from 'app/router';

const CouponCreatePage: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleCouponSave = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      // TODO: integrate API.
      console.log(values);

      message.success(t('couponCreate.createCouponSuccess'), 10);
      setLoading(false);
      history.push('/');
    }, 2000);
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
