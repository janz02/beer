import React, { useState, useEffect } from 'react';
import './CouponListPage.scss';
import { Button, Table, Input, Icon, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { history } from 'app/router';
import { PaginationConfig, ColumnProps } from 'antd/lib/table';
import { Coupon } from 'models/coupon';
import { useIsMobile } from 'hooks';
import { listCoupons, deleteCoupons } from './couponListSlice';
import { useTranslation } from 'react-i18next';

const CouponListPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { coupons, loading, allCouponsCount } = useSelector(
    (state: RootState) => state.couponList,
  );

  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    pageSizeOptions: ['10', '20', '50', '100'],
    showSizeChanger: true,
    simple: isMobile,
  } as PaginationConfig);

  useEffect(() => {
    dispatch(listCoupons(pagination.pageSize!, pagination.current!));
  }, [dispatch, pagination]);

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
          {t('couponList.search')}
        </Button>
      </div>
    ),
    filterIcon: () => <Icon type="search" />,
  });

  const columns: ColumnProps<Coupon>[] = [
    {
      title: t('couponList.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      ...notActionCellProps,
      ...getColumnSearchProps('name'),
    },
    {
      title: t('couponList.description'),
      dataIndex: 'description',
      key: 'description',
      ...notActionCellProps,
      ...getColumnSearchProps('description'),
    },
    {
      title: t('couponList.action'),
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/coupons/${record.id}/${true}`}>
            {t('couponList.edit')}
          </Link>
          |
          <Popconfirm
            title={t('couponList.deleteConfirmMessage')}
            onConfirm={() => {
              dispatch(deleteCoupons(record.id!));
            }}
            okText={t('common.ok')}
            cancelText={t('common.cancel')}
          >
            <Button type="danger" size="small">
              {t('couponList.delete')}
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="coupons-list-page">
      <h1>{t('couponList.coupons')}</h1>
      <Button type="primary">
        <Link to="/coupons/create">{t('couponList.create')}</Link>
      </Button>
      <Table
        dataSource={coupons}
        columns={columns}
        rowKey={(x) => x.id!.toString()}
        pagination={{ ...pagination, total: allCouponsCount }}
        loading={loading}
        onChange={(pagination, filters, sorter) => {
          setPagination(pagination);
        }}
      />
    </div>
  );
};

export default CouponListPage;
