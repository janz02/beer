import React from 'react';
import { useTranslation } from 'react-i18next';

const CouponDisplayPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('couponDisplay.coupon')}</h1>
    </div>
  );
};

export default CouponDisplayPage;
