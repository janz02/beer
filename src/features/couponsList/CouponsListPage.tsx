import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const CouponsListPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Button type="primary">{t('coupons.create')}</Button>
    </div>
  );
};

export default CouponsListPage;
