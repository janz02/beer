import React, { useState, useEffect } from 'react';
import './CouponListPage.scss';
import { Button, Table, Input, Icon, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { history } from 'app/router';
import { ColumnProps } from 'antd/lib/table';
import { Coupon } from 'models/coupon';
import { useIsMobile } from 'hooks';
import { listCoupons, deleteCoupons } from './couponListSlice';
import { useTranslation } from 'react-i18next';
import { CouponListingOptions } from 'models/couponListingOptions';
import { OrderByType } from 'api/swagger/models';

const CouponListPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { coupons, loading, allCouponsCount } = useSelector(
    (state: RootState) => state.couponList,
  );

  const [listingOptions, setListingOptions] = useState<CouponListingOptions>({
    pageSize: 10,
    current: 1,
  });

  useEffect(() => {
    dispatch(listCoupons(listingOptions));
  }, [dispatch, listingOptions]);

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
          {t('coupon-list.search')}
        </Button>
      </div>
    ),
    filterIcon: () => <Icon type="search" />,
  });

  const columns: ColumnProps<Coupon>[] = [
    {
      title: t('coupon-list.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      ...notActionCellProps,
      ...getColumnSearchProps('name'),
    },
    {
      title: t('coupon-list.description'),
      dataIndex: 'description',
      key: 'description',
      ...notActionCellProps,
      ...getColumnSearchProps('description'),
    },
    {
      title: t('coupon-list.action'),
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/coupons/${record.id}/${true}`}>
            {t('coupon-list.edit')}
          </Link>
          &nbsp;|&nbsp;
          <Popconfirm
            title={t('coupon-list.delete-confirm-message')}
            onConfirm={() => {
              dispatch(deleteCoupons(record.id!));
            }}
            okText={t('common.ok')}
            cancelText={t('common.cancel')}
          >
            <Button type="danger" size="small">
              {t('coupon-list.delete')}
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="coupons-list-page">
      <h1>{t('coupon-list.coupons')}</h1>
      <Button type="primary">
        <Link to="/coupons/create">{t('coupon-list.create')}</Link>
      </Button>
      <Table
        dataSource={coupons}
        columns={columns}
        rowKey={(x) => x.id!.toString()}
        pagination={{
          pageSizeOptions: ['10', '20', '50', '100'],
          showSizeChanger: true,
          simple: isMobile,
          total: allCouponsCount,
        }}
        loading={loading}
        onChange={(pagination, filters, sorter) => {
          let orderByType: OrderByType;
          let orderBy: string;
          switch (sorter.order) {
            case 'descend':
              orderByType = OrderByType.Descending;
              orderBy = sorter.columnKey;
              break;
            case 'ascend':
              orderByType = OrderByType.Ascending;
              orderBy = sorter.columnKey;
              break;
          }

          setListingOptions({
            pageSize: pagination.pageSize!,
            current: pagination.current!,
            orderByType,
            orderBy,
          });
        }}
      />
    </div>
  );
};

export default CouponListPage;
