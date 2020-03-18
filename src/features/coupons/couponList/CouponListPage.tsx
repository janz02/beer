import React, { useState, useEffect, useMemo } from 'react'
import './CouponListPage.scss'
import { Button } from 'antd'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import { Coupon } from 'models/coupon'
import { getWaitingCoupons, deleteCoupon } from './couponListSlice'
import { useTranslation } from 'react-i18next'
import { CouponState, Roles } from 'api/swagger/models'
import { ColumnType, ColumnFilterItem } from 'antd/lib/table/interface'
import { MomentDisplay } from 'components/MomentDisplay'
import { getCategories } from '../couponsSlice'
import { hasPermission } from 'services/jwt-reader'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { ResponsivePage } from 'components/responsive/ResponsivePage'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useTableUtils } from 'hooks/useTableUtils'
import { GenericPopup } from 'components/popups/GenericPopup'
import { PlusOutlined } from '@ant-design/icons'

const couponEditorRoles = [
  Roles.Administrator,
  Roles.CampaignManager,
  Roles.PartnerContactApprover,
  Roles.PartnerContactEditor
]

export const CouponListPage: React.FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { categories } = useSelector((state: RootState) => state.coupons)
  const { coupons, loading, pagination } = useSelector((state: RootState) => state.couponList)

  const [couponToDelete, setCouponToDelete] = useState<{
    coupon?: Coupon
    popupVisible?: boolean
  } | null>()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(getWaitingCoupons())
  }, [dispatch])

  const { paginationConfig, handleTableChange, sorterConfig } = useTableUtils({
    paginationState: pagination,
    filterKeys: ['state', 'categoryId'],
    getDataAction: getWaitingCoupons
  })

  const columnsConfig: ColumnType<Coupon>[] = useMemo(
    () => [
      {
        title: t('coupon-list.name'),
        dataIndex: 'name',
        key: 'name',
        ...sorterConfig
      },
      {
        title: t('coupon-list.state'),
        dataIndex: 'state',
        key: 'state',
        filters: Object.keys(CouponState).map(f => {
          return { text: t(`coupon.state.${f?.toLowerCase()}`), value: f } as ColumnFilterItem
        }),
        filterMultiple: false,
        render(value) {
          return t(`coupon.state.${value?.toLowerCase()}`)
        },
        ...sorterConfig
      },
      {
        title: t('coupon-list.categoryId'),
        dataIndex: 'categoryId',
        key: 'categoryId',
        render(value) {
          return categories && categories.find(x => x.id === +value)?.name
        },
        filters:
          categories?.map(x => {
            return { text: x.name, value: x.id?.toString() } as ColumnFilterItem
          }) ?? [],
        filterMultiple: false,
        ...sorterConfig
      },
      {
        title: t('coupon-list.startDate'),
        dataIndex: 'startDate',
        key: 'startDate',
        render(value) {
          return <MomentDisplay date={value} />
        },
        ...sorterConfig
      },
      {
        title: t('coupon-list.endDate'),
        dataIndex: 'endDate',
        key: 'endDate',
        render(value) {
          return <MomentDisplay date={value} />
        },
        ...sorterConfig
      },
      {
        title: t('coupon-list.expireDate'),
        dataIndex: 'expireDate',
        key: 'expireDate',
        render(value) {
          return <MomentDisplay date={value} />
        },
        ...sorterConfig
      },

      {
        title: '',
        key: 'action',
        render(record: Coupon) {
          return (
            <CrudButtons
              onView={() => history.push(`/coupon/${record.id}`)}
              onEdit={
                hasPermission(couponEditorRoles)
                  ? () => history.push(`/coupon/${record.id}/edit`)
                  : undefined
              }
              onDelete={
                hasPermission(couponEditorRoles) &&
                (record.state === CouponState.Created || record.state === CouponState.Waiting)
                  ? () => {
                      setCouponToDelete({
                        coupon: record,
                        popupVisible: true
                      })
                    }
                  : undefined
              }
            />
          )
        }
      }
    ],
    [categories, sorterConfig, t]
  )

  const headerOptions = hasPermission(couponEditorRoles) ? (
    <Button
      type="primary"
      onClick={() => history.push(`/coupon`)}
      icon={<PlusOutlined />}
      size="large"
    >
      {t('coupon-list.add')}
    </Button>
  ) : (
    undefined
  )

  return (
    <>
      <ResponsivePage>
        <ResponsiveCard
          forTable
          floatingTitle={t('coupon-list.coupons')}
          floatingOptions={headerOptions}
          paddedBottom
          extraWide
        >
          <ResponsiveTable
            {...{
              loading: loading,
              columns: columnsConfig,
              dataSource: coupons.map((u, i) => ({ ...u, key: i })),
              pagination: paginationConfig,
              onChange: handleTableChange,
              size: 'small'
            }}
          />
        </ResponsiveCard>
      </ResponsivePage>

      <GenericPopup
        id={couponToDelete?.coupon?.id}
        type="delete"
        visible={!!couponToDelete?.popupVisible}
        onOkAction={deleteCoupon(couponToDelete?.coupon?.id!)}
        onCancel={() => setCouponToDelete({ ...couponToDelete, popupVisible: false })}
        afterClose={() => setCouponToDelete(null)}
      />
    </>
  )
}
