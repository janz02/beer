import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const CouponEditorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('couponEditor.editor')}</h1>
      <Button type="primary">{t('couponEditor.save')}</Button>
    </div>
  );
};

export default CouponEditorPage;
