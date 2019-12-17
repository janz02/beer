import React, { useState, useEffect } from 'react';
import './CouponsListPage.scss';
import { Button, Table, Input, Icon } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { history } from 'app/router';
import { PaginationConfig, ColumnProps } from 'antd/lib/table';
import { Coupon } from 'models/coupon';
import { useIsMobile } from 'hooks';
import { getCoupons } from './couponsListSlice';

const CouponsListPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { coupons, loading } = useSelector(
    (state: RootState) => state.couponsList,
  );

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    pageSizeOptions: ['10', '20', '50', '100'],
    showSizeChanger: true,
    simple: isMobile,
  } as PaginationConfig);

  const notActionCellProps: ColumnProps<Coupon> = {
    onCell: (record: Coupon) => {
      return {
        onClick: () => {
          history.push(`/coupons/${record.id}/${false}`);
        },
      };
    },
  };

  const getColumnSearchProps = (dataIndex: string): ColumnProps<Coupon> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="table-filter">
        <Input
          placeholder={`Search ${dataIndex}`}
          className="table-filter__search-field"
        />
        <Button
          type="primary"
          icon="search"
          size="small"
          onClick={() => confirm!()}
        >
          {t('couponsList.search')}
        </Button>
      </div>
    ),
    filterIcon: () => <Icon type="search" />,
  });

  const columns: ColumnProps<Coupon>[] = [
    {
      title: t('couponsList.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      ...notActionCellProps,
      ...getColumnSearchProps('name'),
    },
    {
      title: t('couponsList.description'),
      dataIndex: 'description',
      key: 'description',
      ...notActionCellProps,
      ...getColumnSearchProps('description'),
    },
    {
      title: t('couponsList.action'),
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/coupons/${record.id}/${true}`}>
            {t('couponsList.edit')}
          </Link>
        </span>
      ),
    },
  ];

  return (
    <div className="coupons-list-page">
      <h1>{t('couponsList.coupons')}</h1>
      <Button type="primary">
        <Link to="/coupons/create">{t('couponsList.create')}</Link>
      </Button>
      <Table
        dataSource={coupons}
        columns={columns}
        rowKey={(x) => x.id.toString()}
        pagination={pagination}
        loading={loading}
        onChange={(pagination, filters, sorter) => {
          setPagination(pagination);

          // TODO: use Redux to fetch data.
          setPagination(pagination);
          console.log(pagination);
          console.log(filters);
          console.log(sorter);
        }}
      />
    </div>
  );
};

export default CouponsListPage;
