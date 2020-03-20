import React, { useState, useEffect, useMemo } from 'react'
import './CouponListPage.scss'
import { Button, Switch, Checkbox } from 'antd'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import { Coupon } from 'models/coupon'
import { getWaitingCoupons, deleteCoupon, setIncludeArchived } from './couponListSlice'
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
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
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
  const { coupons, includeArchived, loading, listParams } = useSelector(
    (state: RootState) => state.couponList
  )

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

  const { paginationConfig, handleTableChange, columnConfig } = useTableUtils<Coupon>({
    listParamsState: listParams,
    filterKeys: ['name', 'state', 'categoryId', 'startDate', 'endDate', 'expireDate'],
    getDataAction: getWaitingCoupons
  })

  const columnsConfig = useMemo(
    (): ColumnType<Coupon>[] => [
      columnConfig({
        title: t('coupon-list.campaign-type'),
        key: '',
        sort: true,
        filterMode: FilterMode.FILTER
      }),
      columnConfig({
        title: t('coupon-list.partner'),
        key: '',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('coupon-list.view-count'),
        key: ''
      }),
      columnConfig({
        title: t('coupon-list.click-count'),
        key: ''
      }),
      columnConfig({
        title: t('coupon-list.redeem-count'),
        key: ''
      }),
      columnConfig({
        title: t('coupon-list.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('coupon-list.state'),
        key: 'state',
        sort: true,
        filterMode: FilterMode.FILTER,
        filters: Object.keys(CouponState).map(f => {
          return { text: t(`coupon.state.${f?.toLowerCase()}`), value: f } as ColumnFilterItem
        }),
        render(value) {
          return t(`coupon.state.${value?.toLowerCase()}`)
        }
      }),
      columnConfig({
        title: t('coupon-list.category'),
        key: 'categoryId',
        sort: true,
        filterMode: FilterMode.FILTER,
        filters:
          categories?.map(x => {
            return { text: x.name, value: x.id?.toString() } as ColumnFilterItem
          }) ?? [],
        render(value) {
          return categories && categories.find(x => x.id === +value)?.name
        }
      }),
      columnConfig({
        title: t('coupon-list.rank'),
        key: 'rank',
        sort: true,
        filterMode: FilterMode.FILTER
      }),
      columnConfig({
        title: t('coupon-list.small-image'),
        key: ''
      }),
      columnConfig({
        title: t('coupon-list.start-date'),
        key: 'startDate',
        sort: true,
        render(value) {
          return <MomentDisplay date={value} />
        }
      }),
      columnConfig({
        title: t('coupon-list.end-date'),
        key: 'endDate',
        sort: true,
        render(value) {
          return <MomentDisplay date={value} />
        }
      }),
      columnConfig({
        title: t('coupon-list.expire-date'),
        key: 'expireDate',
        sort: true,
        render(value) {
          return <MomentDisplay date={value} />
        }
      }),
      columnConfig({
        title: t('coupon-list.redee-mode'),
        key: '',
        sort: true,
        filterMode: FilterMode.FILTER
      }),
      columnConfig({
        title: t('coupon-list.discount-type'),
        key: 'type',
        sort: true,
        filterMode: FilterMode.FILTER
      }),
      columnConfig({
        title: t('coupon-list.discount-amount'),
        key: 'discountValue',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('coupon-list.coupon-count'),
        key: 'couponCount',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('coupon-list.minimum-shopping-value'),
        key: 'minimumShoppingValue',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('coupon-list.preferred-position'),
        key: '',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('coupon-list.user'),
        key: '',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      {
        key: 'action',
        render(record: Coupon) {
          return (
            <CrudButtons
              onView={() => history.push(`/campaign/${record.id}`)}
              onEdit={
                hasPermission(couponEditorRoles)
                  ? () => history.push(`/campaign/${record.id}/edit`)
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
    [categories, columnConfig, t]
  )

  const headerOptions = (
    <>
      <Checkbox
        onChange={e => {
          dispatch(setIncludeArchived(e.target.checked))
          dispatch(getWaitingCoupons())
        }}
      >
        {t('coupon-list.show-archived')}
      </Checkbox>
      {hasPermission(couponEditorRoles) && (
        <Button
          type="primary"
          onClick={() => history.push(`/campaign`)}
          icon={<PlusOutlined />}
          size="large"
        >
          {t('coupon-list.add')}
        </Button>
      )}
    </>
  )

  return (
    <>
      <ResponsivePage>
        <ResponsiveCard
          forTable
          floatingTitle={t('coupon-list.campaigns')}
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
              onChange: handleTableChange
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
