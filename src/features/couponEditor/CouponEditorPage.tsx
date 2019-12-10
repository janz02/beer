import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CouponEditorForm from './CouponEditorForm';
import { message } from 'antd';
import { history } from 'app/router';

const CouponEditorPage: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleCouponSave = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      console.log(values);

      message.success(t('couponEditor.createCouponSuccess'), 10);
      setLoading(false);
      history.push('/');
    }, 2000);
  };

  const props = {
    handleCouponSave,
    loading,
  };

  return (
    <>
      <CouponEditorForm {...props} />
    </>
  );
};

export default CouponEditorPage;
