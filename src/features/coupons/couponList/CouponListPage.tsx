import React, { useState, useEffect } from 'react'
import './CouponListPage.scss'
import { Button, Table, Popconfirm } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import { Coupon } from 'models/coupon'
import { useIsMobile } from 'hooks'
import { getCoupons, deleteCoupons } from './couponListSlice'
import { useTranslation } from 'react-i18next'
import { CouponListingOptions } from 'models/couponListingOptions'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { OrderByType, CouponState } from 'api/swagger/models'
import { ColumnType, SorterResult, ColumnFilterItem } from 'antd/lib/table/interface'
import { MomentDisplay } from 'components/MomentDisplay'
import { listCategories } from '../couponsSlice'

export const CouponListPage: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  const { coupons, loading, allCouponsCount } = useSelector((state: RootState) => state.couponList)
  const { categories } = useSelector((state: RootState) => state.coupons)

  const [listingOptions, setListingOptions] = useState<CouponListingOptions>({
    pageSize: 10,
    current: 1
  })

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(getCoupons(listingOptions))
  }, [dispatch, listingOptions])

  const notActionCellProps = {
    sorter: true,
    onCell: (record: Coupon) => {
      return {
        onClick: () => {
          history.push(`/coupons/${record.id}/${false}`)
        }
      }
    }
  }

  const columns: ColumnType<Coupon>[] = [
    {
      title: t('coupon-list.name'),
      dataIndex: 'name',
      key: 'name',
      ...notActionCellProps
    },
    {
      title: t('coupon-list.state'),
      dataIndex: 'state',
      key: 'state',
      ...notActionCellProps,
      filters: Object.keys(CouponState).map(x => {
        return { text: x, value: x } as ColumnFilterItem
      }),
      filterMultiple: false
    },
    {
      title: t('coupon-list.categoryId'),
      dataIndex: 'categoryId',
      key: 'categoryId',
      ...notActionCellProps,
      render(value) {
        return categories && categories.find(x => x.id === +value)?.name
      },
      filters: categories
        ? categories.map(x => {
            return { text: x.name, value: x.id?.toString() } as ColumnFilterItem
          })
        : [],
      filterMultiple: false
    },
    {
      title: t('coupon-list.startDate'),
      dataIndex: 'startDate',
      key: 'startDate',
      ...notActionCellProps,
      render(value) {
        return <MomentDisplay date={value} />
      }
    },
    {
      title: t('coupon-list.endDate'),
      dataIndex: 'endDate',
      key: 'endDate',
      ...notActionCellProps,
      render(value) {
        return <MomentDisplay date={value} />
      }
    },
    {
      title: t('coupon-list.expireDate'),
      dataIndex: 'expireDate',
      key: 'expireDate',
      ...notActionCellProps,
      render(value) {
        return <MomentDisplay date={value} />
      }
    },
    {
      title: t('coupon-list.action'),
      key: 'action',
      render(_text, record) {
        return (
          <span>
            <Button>
              <Link to={`/coupons/${record.id}/${true}`}>
                <EditOutlined />
              </Link>
            </Button>
            &nbsp;
            <Popconfirm
              title={t('coupon-list.delete-confirm-message')}
              onConfirm={() => {
                record.id && dispatch(deleteCoupons(record.id))
              }}
              okText={t('common.ok')}
              cancelText={t('common.cancel')}
            >
              <Button danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </span>
        )
      }
    }
  ]

  const cardHeader = (): JSX.Element => (
    <div className="coupons-list__header">
      <h3>{t('coupon-list.coupons')}</h3>
      <Button type="primary">
        <Link to="/coupons/create">{t('coupon-list.create')}</Link>
      </Button>
    </div>
  )

  return (
    <div className="coupons-list-page">
      <Table
        title={() => cardHeader()}
        dataSource={coupons}
        columns={columns}
        rowKey={(x): string => (x.id ? x.id.toString() : '')}
        pagination={{
          pageSizeOptions: ['10', '20', '50', '100'],
          showSizeChanger: true,
          simple: isMobile,
          total: allCouponsCount
        }}
        loading={loading}
        onChange={(pagination, filters, sorter) => {
          const couponListingOptions: CouponListingOptions = {
            pageSize: pagination.pageSize,
            current: pagination.current
          }

          const couponSorter = sorter as SorterResult<Coupon>
          if (couponSorter.order) {
            switch (couponSorter.order) {
              case 'descend':
                couponListingOptions.orderByType = OrderByType.Descending
                if (couponSorter.columnKey) {
                  couponListingOptions.orderBy = couponSorter.columnKey.toString()
                }
                break
              case 'ascend':
                couponListingOptions.orderByType = OrderByType.Ascending
                if (couponSorter.columnKey) {
                  couponListingOptions.orderBy = couponSorter.columnKey.toString()
                }
                break
            }
          }

          // TODO: integrate filtering.
          if (filters.state) {
            console.log(filters.state[0])
          }
          if (filters.categoryId) {
            console.log(filters.categoryId[0])
          }

          setListingOptions(couponListingOptions)
        }}
      />
    </div>
  )
}
