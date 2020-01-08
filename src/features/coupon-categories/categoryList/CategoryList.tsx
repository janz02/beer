import React, { FC } from 'react';
import './category-list.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { Table, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from 'hooks';

const columnsConfig = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Actions',
    dataIndex: '',
    key: 'x',
    render: () => (
      <>
        <Button type="link">Edit</Button> | <Button type="link">Delete</Button>
      </>
    ),
  },
];

const CategoryListHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="category-list__header">
      <h3>{t('coupon-category.list-title')}</h3>
      <Button>{t('common.create')}</Button>
    </div>
  );
};

export const CategoryList: FC = () => {
  const isMobile = useIsMobile();


  const categories = useSelector(
    (state: RootState) => state.couponCategories.categories
  );

  return (
    <Table
      className="category-list list-card_table--paginated"
      title={() => <CategoryListHeader />}
      columns={columnsConfig}
      dataSource={categories}
      pagination={{ simple: isMobile }}
    />
  );
};
