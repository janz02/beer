import React from 'react';
import { useTranslation } from 'react-i18next';
import CouponEditorForm from './CouponEditorForm';
import { message } from 'antd';

const CouponEditorPage: React.FC = () => {
  const { t } = useTranslation();

  const handleCouponSave = (values: any) => {
    console.log('Name: ', values['name']);

    message.success(t('couponEditor.createCouponSuccess'), 10);
  };

  return (
    <>
      <CouponEditorForm handleCouponSave={handleCouponSave} />
    </>
  );
};

export default CouponEditorPage;
