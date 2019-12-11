import React from 'react';
import { Button, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';

const CouponsListPage: React.FC = () => {
  const { t } = useTranslation();
  const { coupons } = useSelector((state: RootState) => state.couponsList);

  const columns = [
    {
      title: t('couponsList.name'),
      dataIndex: 'name',
      key: 'name',
      render: (value: any) => <Link to="/coupons/view">{value}</Link>,
    },
    {
      title: t('couponsList.description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('couponsList.action'),
      key: 'action',
      render: () => (
        <span>
          <Link to="/coupons/create"> {t('couponsList.edit')}</Link>
        </span>
      ),
    },
  ];
  return (
    <div>
      <h1>{t('couponsList.coupons')}</h1>
      <Button type="primary">
        <Link to="/coupons/create">{t('couponsList.create')}</Link>
      </Button>
      <Table dataSource={coupons} columns={columns} />;
    </div>
  );
};

export default CouponsListPage;
