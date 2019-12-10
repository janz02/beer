import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CouponsListPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('couponsList.coupons')}</h1>
      <Button type="primary">
        <Link to="/coupons/create">{t('couponsList.create')}</Link>
      </Button>
    </div>
  );
};

export default CouponsListPage;
